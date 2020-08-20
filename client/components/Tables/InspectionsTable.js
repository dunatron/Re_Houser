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

//components
import Modal from '../Modal/index';
import Error from '../ErrorMessage';

//rentalApplicationsConnection
// connection querys
import { INSPECTIONS_CONNECTION_QUERY } from '../../graphql/connections';
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
const INSPECTIONS_COUNT_QUERY = gql`
  query INSPECTIONS_COUNT_QUERY(
    $where: InspectionWhereInput
    $orderBy: InspectionOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    inspectionsConnection(
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

const InspectionsTable = ({ where, me }) => {
  const connectionKey = 'inspectionsConnection'; // e.g inspectionsConnection
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
    { title: 'date', field: 'date', editable: false },
    {
      field: 'completed',
      title: 'completed',
      render: rowData => {
        return rowData.completed ? 'Yes' : 'No';
      },
    },
  ];

  const sharedWhere = {
    ...where,
  };

  const { data, loading, error, refetch } = useQuery(INSPECTIONS_COUNT_QUERY, {
    variables: {
      where: {
        ...where,
      },
    },
  });

  if (error) return <Error error={error} />;

  const totalItemCount = data ? data[connectionKey].aggregate.count : 0;

  const remoteData = query => {
    return client
      .query({
        query: INSPECTIONS_CONNECTION_QUERY,
        fetchPolicy: networkOnly ? 'network-only' : 'cache-first', // who needs a tradeoff when your a god
        variables: {
          where: {
            ...where,
            ...sharedWhere,
          },
          orderBy: 'createdAt_DESC',
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

  //ToDo: listen to new items coming in based on the query to get the items yea?

  // that actually sounds half decent and robust if you can pull it off
  return (
    <div className={classes.root}>
      <div className={classes.tableHeader}></div>
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

export default InspectionsTable;
