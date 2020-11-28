import React, { useRef, useState, useContext, useEffect } from 'react';
import { store } from '@/Store/index';
import gql from 'graphql-tag';
import moment from 'moment';
import {
  useApolloClient,
  useQuery,
  useMutation,
  NetworkStatus,
} from '@apollo/client';

import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import Error from '@/Components/ErrorMessage';
import Loader from '@/Components/Loader';
import { Button, IconButton } from '@material-ui/core';

import { INSPECTIONS_CONNECTION_QUERY } from '@/Gql/connections';
// mutations
import { UPDATE_INSPECTION_MUTATION } from '@/Gql/mutations';

import PropTypes from 'prop-types';
import { mePropTypes, propertyPropTypes } from '../../propTypes';
import { useRouter } from 'next/router';

import CachedIcon from '@material-ui/icons/Cached';

//counts
import { useInspectionsCount } from '@/Lib/hooks/counts/useInspectionsCount';

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
  const router = useRouter();

  const totalCount = useInspectionsCount({ where: where });

  const tableColumnConfig = [
    // { title: 'id', field: 'id', editable: true },
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
  ];

  const sharedWhere = {
    ...where,
  };

  const [updateInspection, updateInspectionProps] = useMutation(
    UPDATE_INSPECTION_MUTATION,
    {
      onError: err => setTableErr(err),
      onCompleted: data => {},
    }
  );

  const remoteData = async query => {
    return client
      .query({
        query: INSPECTIONS_CONNECTION_QUERY,
        fetchPolicy: networkOnly ? 'network-only' : 'cache-first', // who needs a tradeoff when your a god
        variables: {
          where: {
            ...where,
            ...sharedWhere,
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
          totalCount: totalCount.count,
        };
      })
      .catch(e => {
        setTableErr(e);
      })
      .finally(() => {
        setNetworkOnly(false);
      });
  };

  const manageInspection = (e, rowData) => {
    router.push({
      pathname: `/inspection/${rowData.id}`,
    });
  };

  const isCompleted = v => {
    if (v === true) return true;
    if (v === false) return false;
    const valAsStr = String(v).toLowerCase();
    if (valAsStr === 'yes' || valAsStr === 'true') return true;
    return false;
  };

  const refetchTable = async () => {
    setNetworkOnly(true);
    client.cache.modify({
      fields: {
        [connectionKey](existingRef, { readField }) {
          return existingRef.edges ? {} : existingRef;
        },
      },
    });
    await tableRef.current.onQueryChange();
  };

  useEffect(() => {
    if (tableRef.current) {
      refetchTable();
    }
  }, [totalCount.count]);

  if (totalCount.loading) return 'Loading count';

  return (
    <div className={classes.root}>
      <div className={classes.tableHeader}>
        <IconButton onClick={refetchTable}>
          <CachedIcon />
        </IconButton>
      </div>
      <Error error={tableErr} />
      <MaterialTable
        isLoading={totalCount.loading}
        style={{
          marginBottom: '16px',
        }}
        tableRef={tableRef}
        columns={tableColumnConfig}
        data={remoteData}
        options={{
          toolbar: false, // This will disable the in-built toolbar where search is one of the functionality
          filtering: true,
        }}
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
  me: mePropTypes,
  where: PropTypes.object,
  orderBy: PropTypes.object,
};

export default InspectionsTable;
