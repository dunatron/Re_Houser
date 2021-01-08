import React, { useRef, useState, useContext, useEffect } from 'react';
import Router from 'next/router';
import { store } from '../../store';
import { useApolloClient } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
// import MaterialTable from 'material-table';
import ConnectionTable, {
  getEnumLookupList,
} from '@/Components/SuperiorTable/ConnectionTable';

//components
import Error from '@/Components/ErrorMessage';
import UserDetails from '../../components/UserDetails';
import List from '@material-ui/core/List';

import {
  PROPERTIES_CONNECTION_QUERY,
  PROPERTIES_COUNT_QUERY,
} from '../../graphql/connections';
// mutations

const useStyles = makeStyles(theme => ({
  root: {},
  tableHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
}));

const PropertiesTable = ({
  where,
  me,
  orderBy = 'createdAt_DESC',
  enableAddressParams,
}) => {
  const connectionKey = 'propertiesConnection'; // e.g inspectionsConnection
  const globalStore = useContext(store);
  const { dispatch, state } = globalStore;
  const classes = useStyles();
  const client = useApolloClient();
  const tableRef = useRef(null);
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
      {
        field: 'agents',
        title: 'agents',
        filtering: false,
        render: rowData => (
          <List>
            {rowData.agents &&
              rowData.agents.map((agent, idx) => {
                return <UserDetails key={idx} user={agent} me={me} />;
              })}
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
        enableAddressParams={enableAddressParams}
        title="All Properties"
        connectionKey={connectionKey}
        where={where}
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

export default PropertiesTable;
