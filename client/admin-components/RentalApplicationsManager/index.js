import React, { useRef, useState, useContext, useEffect } from 'react';
import { store } from '../../store';
import gql from 'graphql-tag';
import {
  useApolloClient,
  useQuery,
  useSubscription,
  useMutation,
  NetworkStatus,
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
import Error from '@/Components/ErrorMessage';
import Loader from '@/Components/Loader';
import RentalApplication from '@/Components/RentalApplication';

//rentalApplicationsConnection
// connection querys
import { RENTAL_APPLICATIONS_CONNECTION_QUERY } from '../../graphql/connections';
// mutations
import { OFFER_RENTAL_APPRAISAL_MUTATION } from '../../graphql/mutations';

//icons
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import CachedIcon from '@material-ui/icons/Cached';

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
  query RENTAL_APPLICATIONS_COUNT_QUERY(
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

const AdminRentalApplicationsTable = ({
  where,
  me,
  orderBy = 'createdAt_DESC',
}) => {
  const connectionKey = 'rentalApplicationsConnection'; // e.g inspectionsConnection
  const globalStore = useContext(store);
  const { dispatch, state } = globalStore;
  const classes = useStyles();
  const client = useApolloClient();
  const tableRef = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [networkOnly, setNetworkOnly] = useState(false);
  const [tableErr, setTableErr] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currItem, setCurrItem] = useState({});

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

  const { data, loading, error, refetch, networkStatus } = useQuery(
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

  const totalItemCount = data ? data[connectionKey].aggregate.count : 0;

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
          orderBy: orderBy,
          skip: query.page * query.pageSize,
          first: query.pageSize,
          limit: query.pageSize,
        },
      })
      .then(res => {
        const {
          data: {
            [connectionKey]: { pageInfo, aggregate, edges },
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

  const refetchTable = async () => {
    setNetworkOnly(true);
    refetch({
      variables: {
        where: {
          ...where,
        },
        orderBy: orderBy,
      },
    });
    client.cache.modify({
      fields: {
        [connectionKey](existingRef, { readField }) {
          return existingRef.edges ? {} : existingRef;
        },
      },
    });
    await tableRef.current.onQueryChange();
  };

  const viewRentalApplication = (e, data) => {
    setCurrItem(data);
    setModalIsOpen(true);
  };

  if (loading && networkStatus === NetworkStatus.loading)
    return <Loader loading={loading} text="Getting total properties count" />;

  if (error) return <Error error={error} />;

  return (
    <div className={classes.root}>
      <Modal
        title="Test view"
        fullScreen
        disableBackdrop
        open={modalIsOpen}
        close={() => setModalIsOpen(false)}>
        <RentalApplication id={currItem.id} me={me} />
      </Modal>
      <div className={classes.tableHeader}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}>
          <Typography variant="h5">Rental Applications</Typography>
          <IconButton onClick={refetchTable}>
            <CachedIcon />
          </IconButton>
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
        actions={[
          {
            icon: 'pageview',
            tooltip: 'View Application',
            onClick: viewRentalApplication,
          },
        ]}
      />
    </div>
  );
};

export default AdminRentalApplicationsTable;
