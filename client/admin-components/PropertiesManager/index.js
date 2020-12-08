import React, { useRef, useState, useContext, useEffect } from 'react';
import Router from 'next/router';
import { store } from '../../store';
import gql from 'graphql-tag';
import { useApolloClient, useQuery, NetworkStatus } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
// import MaterialTable from 'material-table';
import ConnectionTable from '@/Components/SuperiorTable/ConnectionTable';
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
import UserDetails from '../../components/UserDetails';
import List from '@material-ui/core/List';

//rentalApplicationsConnection
// connection querys
import { PROPERTIES_CONNECTION_QUERY } from '../../graphql/connections';
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
export const PROPERTIES_COUNT_QUERY = gql`
  query PROPERTIES_COUNT_QUERY(
    $where: PropertyWhereInput
    $orderBy: PropertyOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    propertiesConnection(
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
  const connectionKey = 'propertiesConnection'; // e.g inspectionsConnection
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
    { title: 'property', field: 'location', editable: false, searchable: true },
    // { title: 'created', field: 'createdAt', editable: false },
    { title: 'onTheMarket', field: 'onTheMarket' },
    // { title: 'owners', field: 'owners' },

    { title: 'isLeased', field: 'isLeased' },
    {
      field: 'creator',
      title: 'creator',
      render: rowData => (
        <List>
          {rowData.creator && <UserDetails user={rowData.creator} me={me} />}
        </List>
      ),
    },
  ];

  const manageProperty = (e, rowData) =>
    Router.push({
      pathname: `/landlord/properties/${rowData.id}`,
    });

  return (
    <div className={classes.root}>
      <Error error={tableErr} />
      <ConnectionTable
        style={{
          marginBottom: '16px',
        }}
        connectionKey={connectionKey}
        countQuery={PROPERTIES_COUNT_QUERY}
        gqlQuery={PROPERTIES_CONNECTION_QUERY}
        tableRef={tableRef}
        columns={tableColumnConfig}
        // data={remoteData}
        actions={[
          {
            icon: 'settings',
            tooltip: 'Manage property',
            onClick: manageProperty,
          },
        ]}
      />
    </div>
  );
};

export default AdminRentalApplicationsTable;
