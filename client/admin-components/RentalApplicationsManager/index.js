import React, { useRef, useState, useContext, useEffect } from 'react';
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
  Icon,
  Badge,
  Button,
} from '@material-ui/core';
import { PROPERTY_APPRAISAL_SUBSCRIPTION } from '../../graphql/subscriptions/PropertyAppraisalSub';
import moment from 'moment';
import formatCentsToDollars from '../../lib/formatCentsToDollars';

import SubscriberBell from '../SubscriberBell';

//components
import Modal from '../../components/Modal/index';
import Error from '../../components/ErrorMessage';

//rentalApplicationsConnection
// connection querys
import { RENTAL_APPLICATIONS_CONNECTION_QUERY } from '../../graphql/connections';
// mutations
import { OFFER_RENTAL_APPRAISAL_MUTATION } from '../../graphql/mutations';

//icons
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

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
const RENTAL_APPLICATIONS_COUNT_QUERY = gql`
  query APPRAISALS_COUNT_QUERY(
    $where: RentalApplicationWhereInput
    $orderBy: RentalApplicationOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    rentalApplicationsConnection(
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

const AdminRentalApplicationsTable = ({ where, me }) => {
  const globalStore = useContext(store);
  const { dispatch, state } = globalStore;
  const classes = useStyles();
  const client = useApolloClient();
  const tableRef = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [networkOnly, setNetworkOnly] = useState(false);
  const [tableErr, setTableErr] = useState(null);

  const tableColumnConfig = [
    { title: 'id', field: 'id', editable: false },
    { title: 'created', field: 'createdAt', editable: false },
    { title: 'stage', field: 'stage' },
    { title: 'visibility', field: 'visibility' },
    { title: 'property', field: 'property.location', editable: false },
  ];

  const sharedWhere = {
    ...where,
  };

  const { data, loading, error, refetch } = useQuery(
    RENTAL_APPLICATIONS_COUNT_QUERY,
    {
      variables: {
        where: {
          ...where,
        },
      },
    }
  );

  if (error) return <Error error={error} />;

  const totalItemCount = data
    ? data.rentalApplicationsConnection.aggregate.count
    : 0;

  const handleSearchTextChange = e => {
    setSearchText(e.target.value);
  };

  const handleGetSubscriptionItems = async () => {
    await setNetworkOnly(true);
    dispatch({
      type: 'updateState',
      payload: {
        newRentalApplicationsCount: 0,
      },
    });
    await tableRef.current.onQueryChange();
    setNetworkOnly(false);
  };

  const handleSearch = () => {
    tableRef.current.onQueryChange(); // informs table that we need to refetch remoteData
  };

  useEffect(() => {
    if (state.newRentalApplicationsCount > 0) {
      handleGetSubscriptionItems();
    }
  }, [state.newRentalApplicationsCount]);

  const remoteData = query => {
    return client
      .query({
        query: RENTAL_APPLICATIONS_CONNECTION_QUERY,
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
            rentalApplicationsConnection: { pageInfo, aggregate, edges },
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
          <Typography variant="h5">Rental Applications</Typography>
          {/* <IconButton
            onClick={handleGetSubscriptionItems}
            disabled={state.newRentalApplicationsCount > 0 ? false : true}>
            <Badge
              badgeContent={state.newRentalApplicationsCount}
              color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          {/* <Badge
            badgeContent={state.newRentalApplicationsCount}
            color="primary">
            <NotificationsIcon />
          </Badge> */}
          <SubscriberBell
            me={me}
            variable="rentalApplicationCreatedSub"
            title="rental applications created subscription"
          />
          {/* <div
            style={{
              padding: '8px',
            }}>
            <NotificationsActiveIcon color="secondary" />
          </div> */}
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
      />
    </div>
  );
};

export default AdminRentalApplicationsTable;
