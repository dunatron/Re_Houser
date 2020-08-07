import React, { useRef, useState, useContext } from 'react';
import { store } from '../../store';
import gql from 'graphql-tag';
import {
  useApolloClient,
  useQuery,
  useSubscription,
  useMutation,
} from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import {
  Input,
  Typography,
  IconButton,
  Badge,
  Button,
} from '@material-ui/core';

import { PROPERTY_APPRAISAL_SUBSCRIPTION } from '../../graphql/subscriptions/PropertyAppraisalSub';
import moment from 'moment';
import formatCentsToDollars from '../../lib/formatCentsToDollars';
import Modal from '../../components/Modal/index';
import Error from '../../components/ErrorMessage';

// querys
import { RENTAL_APPRAISALS_CONNECTION_QUERY } from '../../graphql/connections';
// mutations
import { OFFER_RENTAL_APPRAISAL_MUTATION } from '../../graphql/mutations';

//icons
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';

const useStyles = makeStyles(theme => ({
  root: {},
  tableHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
}));
//https://medium.com/@harshverma04111989/material-table-with-graphql-remote-data-approach-f05298e1d670
//https://github.com/harshmons/material-table-with-graphql-using-remote-data-approach
const APPRAISALS_COUNT_QUERY = gql`
  query APPRAISALS_COUNT_QUERY(
    $where: RentalAppraisalWhereInput
    $orderBy: RentalAppraisalOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    rentalAppraisalsConnection(
      where: $where
      orderBy: $orderBy
      skip: $skip
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      aggregate {
        count
      }
    }
  }
`;

const AdminRentalAppraisalsTable = ({ where }) => {
  const globalStore = useContext(store);
  const { dispatch, state } = globalStore;
  const classes = useStyles();
  const client = useApolloClient();
  const tableRef = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [networkOnly, setNetworkOnly] = useState(false);
  const [tableErr, setTableErr] = useState(null);

  const tableColumnConfig = [
    // { title: 'id', field: 'id', editable: false },
    { title: 'location', field: 'location', editable: false },
    { title: 'created', field: 'createdAt', editable: false },
    { title: 'locationLat', field: 'locationLat', editable: false },
    { title: 'locationLng', field: 'locationLng', editable: false },
    { title: 'rooms', field: 'rooms', editable: false },
    { title: 'bathrooms', field: 'bathrooms', editable: false },
    { title: 'rent', field: 'rent' },
    { title: 'property', field: 'property.id', editable: false },
  ];

  const sharedWhere = {
    ...where,
    OR: [
      {
        location_contains: searchText,
      },
      // {
      //   amount: parseFloat(searchText),
      // },
    ],
  };

  const { data, loading, error, refetch } = useQuery(APPRAISALS_COUNT_QUERY, {
    variables: {
      where: {
        ...where,
        // ...sharedWhere, every letter change would retrigger this
      },
    },
  });

  const [offerAppraisal, offerAppraisalProps] = useMutation(
    OFFER_RENTAL_APPRAISAL_MUTATION
  );

  if (error) return <Error error={error} />;

  const handleOnSubscriptionData = () => {
    setNetworkOnly(true);
  };

  useSubscription(PROPERTY_APPRAISAL_SUBSCRIPTION, {
    onSubscriptionData: handleOnSubscriptionData,
    variables: {},
  });

  const totalItemCount = data
    ? data.rentalAppraisalsConnection.aggregate.count
    : 0;

  const handleSearchTextChange = e => {
    setSearchText(e.target.value);
  };

  const handleGetSubscriptionItems = async () => {
    await setNetworkOnly(true);
    dispatch({
      type: 'setNewRentalAppraisalCount',
      payload: 0,
    });
    await tableRef.current.onQueryChange();
    setNetworkOnly(false);
  };

  const handleSearch = () => {
    tableRef.current.onQueryChange(); // informs table that we need to refetch remoteData
  };

  const remoteData = query => {
    return client
      .query({
        query: RENTAL_APPRAISALS_CONNECTION_QUERY,
        // fetchPolicy: 'network-only', // simply for subscriptions...
        fetchPolicy: networkOnly ? 'network-only' : 'cache-first', // who needs a tradeoff when your a god
        variables: {
          //   orderBy: 'created_ASC',
          where: {
            ...where,
            ...sharedWhere,
            // OR: [
            //   {
            //     location_contains: searchText,
            //   },
            //   // {
            //   //   amount: parseFloat(searchText),
            //   // },
            // ],
          },
          orderBy: 'createdAt_DESC',
          // orderBy: 'rent_DESC',
          skip: query.page * query.pageSize,
          first: query.pageSize,
          limit: query.pageSize,
        },
      })
      .then(res => {
        const {
          data: {
            rentalAppraisalsConnection: { pageInfo, aggregate, edges },
          },
        } = res;
        // immutatble/freezeObject
        const formattedData = edges.map(edge => ({
          ...edge.node,
        }));
        return {
          data: formattedData,
          page: query.page,
          totalCount: totalItemCount,
        };
      })
      .catch(e => {
        setTableErr(e);
      })
      .finally(() => {
        setNetworkOnly(false);
      });
  };

  return (
    <div className={classes.root}>
      <div className={classes.tableHeader}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}>
          <Typography variant="h5">Appraisals</Typography>
          <IconButton
            onClick={handleGetSubscriptionItems}
            disabled={state.newRentalAppraisalCount > 0 ? false : true}>
            <Badge badgeContent={state.newRentalAppraisalCount} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </div>
        <div>
          <Input
            value={searchText}
            onChange={handleSearchTextChange}
            placeholder="id or amount"
          />
          <IconButton onClick={handleSearch} aria-label="search-table">
            <SearchIcon />
          </IconButton>
        </div>
      </div>
      <Error error={tableErr} />
      <Error error={offerAppraisalProps.error} />
      <MaterialTable
        style={{
          marginBottom: '16px',
        }}
        tableRef={tableRef}
        columns={tableColumnConfig}
        data={remoteData}
        options={{
          toolbar: false, // This will disable the in-built toolbar where search is one of the functionality
        }}
        editable={{
          isEditable: rowData => rowData.rent === null,
          // onRowUpdate must be promise based
          onRowUpdate: (newData, oldData) =>
            offerAppraisal({
              variables: {
                data: {
                  rent: parseFloat(newData.rent),
                },
                where: {
                  id: oldData.id,
                },
              },
            }),
        }}
      />
    </div>
  );
};

export default AdminRentalAppraisalsTable;
