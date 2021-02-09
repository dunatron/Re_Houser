import React, { useRef, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { store } from '../../store';
import { useApolloClient, useMutation } from '@apollo/client';
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
  INSPECTIONS_CONNECTION_QUERY,
  INSPECTIONS_COUNT_QUERY,
} from '../../graphql/connections';
import { UPDATE_INSPECTION_MUTATION } from '@/Gql/mutations';
// mutations
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {},
  tableHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
}));

const InspectionsTable = ({
  where,
  me,
  orderBy = 'createdAt_DESC',
  enableAddressParams,
}) => {
  const router = useRouter();

  const connectionKey = 'inspectionsConnection'; // e.g inspectionsConnection
  const globalStore = useContext(store);
  const { dispatch, state } = globalStore;
  const classes = useStyles();
  const client = useApolloClient();
  const tableRef = useRef(null);
  const [tableErr, setTableErr] = useState({});

  const columns = React.useMemo(
    () => [
      { title: 'property', field: 'property.location', editable: true },
      { title: 'date', field: 'date', editable: true },
      {
        title: 'date',
        field: 'date',
        render: rowData => {
          return moment(rowData.date).format('llll');
        },
      },
      {
        field: 'completed',
        title: 'completed',
        editable: false,
        render: rowData => {
          return rowData.completed ? 'Yes' : 'No';
        },
      },
      { title: 'notes', field: 'notes' },
    ],
    []
  );

  const manageInspection = (e, rowData) => {
    router.push({
      pathname: `/inspection/${rowData.id}`,
    });
  };

  const [updateInspection, updateInspectionProps] = useMutation(
    UPDATE_INSPECTION_MUTATION,
    {
      onError: err => setTableErr(err),
      onCompleted: data => {},
    }
  );

  return (
    <div className={classes.root}>
      <Error error={tableErr} />
      <ConnectionTable
        enableAddressParams={enableAddressParams}
        title="All Properties"
        connectionKey={connectionKey}
        where={where}
        countQuery={INSPECTIONS_COUNT_QUERY}
        gqlQuery={INSPECTIONS_CONNECTION_QUERY}
        searchKeysOR={['location_contains', 'id_contains']}
        orderBy="createdAt_DESC"
        tableRef={tableRef}
        columns={columns}
        actions={[
          {
            icon: 'settings',
            tooltip: 'Manage Inspection',
            onClick: manageInspection,
          },
        ]}
        editable={{
          isEditable: rowData => rowData.completed === false,
          onRowUpdate: (newData, oldData) =>
            updateInspection({
              variables: {
                where: {
                  id: oldData.id,
                },
                data: {
                  completed: isCompleted(newData.completed),
                  notes: newData.notes,
                },
              },
            }),
        }}
      />
    </div>
  );
};

InspectionsTable.propTypes = {
  where: PropTypes.object,
  orderBy: PropTypes.object,
};

export default InspectionsTable;
