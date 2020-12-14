import React, { useRef, useState, useContext, useEffect } from 'react';
import Router from 'next/router';
import { store } from '../../store';
import gql from 'graphql-tag';
import { useApolloClient, useQuery, NetworkStatus } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
// import MaterialTable from 'material-table';
import ConnectionTable, {
  getEnumLookupList,
} from '@/Components/SuperiorTable/ConnectionTable';
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

// const getEnumLookupList = __type => {
//   const { data, error, loading } = useQuery(GET_ENUM_QUERY, {
//     variables: {
//       name: __type,
//     },
//   });
//   return data ? data.__type.enumValues.map(enumObj => enumObj.name) : [];
// };

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
  const [tableErr, setTableErr] = useState({});

  const houseTypeLookup = getEnumLookupList('PropertyType');
  const titleTypeLookup = getEnumLookupList('PropertyTitleType');
  const heatSourceLookup = getEnumLookupList('HeatSource');
  const tenancyTypeLookup = getEnumLookupList('TenancyType');

  const columns = React.useMemo(
    () => [
      {
        title: 'property',
        field: 'location',
        editable: false,
        searchable: true,
        filtering: false,
      },
      {
        title: 'type',
        field: 'type',
        lookup: houseTypeLookup,
        removable: true,
      },

      {
        title: 'titleType',
        field: 'titleType',
        lookup: titleTypeLookup,
        filtering: true,
      },
      {
        title: 'tenancyType',
        field: 'tenancyType',
        lookup: tenancyTypeLookup,
        filtering: true,
      },
      {
        title: 'created',
        field: 'createdAt',
        editable: false,
        type: 'date',
        sorting: true,
      },
      {
        title: 'onTheMarket',
        field: 'onTheMarket',
        type: 'boolean',
        filtering: true,
      },
      // { title: 'owners', field: 'owners' },

      {
        title: 'isLeased',
        field: 'isLeased',
        type: 'boolean',
        filtering: true,
      },
      {
        field: 'creator',
        title: 'creator',
        filtering: false,
        render: rowData => (
          <List>
            {rowData.creator && <UserDetails user={rowData.creator} me={me} />}
          </List>
        ),
      },
    ],
    [houseTypeLookup, tenancyTypeLookup, titleTypeLookup]
  );

  const manageProperty = (e, rowData) =>
    Router.push({
      pathname: `/landlord/properties/${rowData.id}`,
    });

  return (
    <div className={classes.root}>
      <Error error={tableErr} />
      <ConnectionTable
        title="All Properties"
        connectionKey={connectionKey}
        countQuery={PROPERTIES_COUNT_QUERY}
        gqlQuery={PROPERTIES_CONNECTION_QUERY}
        searchKeysOR={['location_contains', 'id_contains']}
        orderBy="createdAt_DESC"
        tableRef={tableRef}
        columns={columns}
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
