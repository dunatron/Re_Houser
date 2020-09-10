import React, { useRef, useState, useContext, useEffect } from 'react';
import { store } from '../../store';
import gql from 'graphql-tag';
import { useApolloClient, useQuery, useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import Error from '../ErrorMessage';

import { INSPECTIONS_CONNECTION_QUERY } from '../../graphql/connections';
// mutations
import { UPDATE_INSPECTION_MUTATION } from '../../graphql/mutations';

import PropTypes from 'prop-types';
import { mePropTypes, propertyPropTypes } from '../../propTypes';

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

const InspectionsTable = ({ where, me, orderBy = 'date_ASC' }) => {
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
    // { title: 'id', field: 'id', editable: true },
    { title: 'property', field: 'property.location', editable: true },
    { title: 'date', field: 'date', editable: true },
    {
      field: 'completed',
      title: 'completed',
      render: rowData => {
        return rowData.completed ? 'Yes' : 'No';
      },
    },
    { title: 'notes', field: 'notes' },
  ];

  const sharedWhere = {
    ...where,
  };

  const { data, loading, error, refetch } = useQuery(INSPECTIONS_COUNT_QUERY, {
    variables: {
      where: {
        ...where,
      },
      orderBy: orderBy,
    },
  });

  const [updateInspection, updateInspectionProps] = useMutation(
    UPDATE_INSPECTION_MUTATION,
    {
      onError: err => setTableErr(err),
      onCompleted: data => {},
    }
  );

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

  const manageInspection = () => {
    alert('ToDo: implement whatever managing an inspectrion looks like');
  };

  const isCompleted = v => {
    if (v === true) return true;
    if (v === false) return false;
    const valAsStr = String(v).toLowerCase();
    if (valAsStr === 'yes' || valAsStr === 'true') return true;
    return false;
  };

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
        actions={[
          {
            icon: 'settings',
            tooltip: 'Manage property',
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
  me: mePropTypes,
  where: PropTypes.object,
  orderBy: PropTypes.object,
};

export default InspectionsTable;
