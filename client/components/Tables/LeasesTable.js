import React, { useRef, useState, useContext, useEffect } from 'react';
import { store } from '@/Store/index';
import gql from 'graphql-tag';
import { useApolloClient, useQuery, useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import Error from '@/Components/ErrorMessage';
import Loader from '@/Components/Loader';
import { Button, IconButton } from '@material-ui/core';
import { PROPERTY_LEASES_CONNECTION_QUERY } from '@/Gql/connections';
import PropTypes from 'prop-types';
import { mePropTypes, propertyPropTypes } from '../../propTypes';
import moment from 'moment';
import { useRouter } from 'next/router';


import CachedIcon from '@material-ui/icons/Cached';

//counts 
import {useLeasesCount} from '@/Lib/hooks/counts/useLeasesCount'

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

const LeasesTable = ({ where, me, orderBy = 'createdAt_DESC' }) => {
  const connectionKey = 'propertyLeasesConnection'; // e.g inspectionsConnection
  const connectionQuery = PROPERTY_LEASES_CONNECTION_QUERY;
  const globalStore = useContext(store);
  const { dispatch, state } = globalStore;
  const classes = useStyles();
  const client = useApolloClient();
  const tableRef = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [networkOnly, setNetworkOnly] = useState(false);
  const [tableErr, setTableErr] = useState(null);
  const router = useRouter();

  const totalCount = useLeasesCount({where: where})

  const tableColumnConfig = [
    { title: 'location', field: 'location', editable: false },
    { title: 'stage', field: 'stage', editable: false },
    {
      title: 'createdAt',
      field: 'createdAt',
      render: rowData => {
        return moment(rowData.createdAt).format('Do MMM YYYY');
      },
    },
   
    {
      title: 'expiryDate',
      field: 'expiryDate',
      render: rowData => {
        return moment(rowData.expiryDate).format('Do MMM YYYY');
      },
    },
    {
      title: 'wallet',
      field: 'wallet',
      render: rowData => {
        return `${rowData.wallet.amount}`;
      },
    },
    { title: 'rent', field: 'rent', editable: false },
  ];

  const sharedWhere = {
    ...where,
  };

  const remoteData = query => {
    return client
      .query({
        query: connectionQuery,
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

  const manageLease = (e, rowData) => {
    router.push({
      pathname: '/landlord/leases/lease',
      query: {
        id: rowData.id,
      },
    });
  }

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
    if(tableRef.current) {
      refetchTable()
    }
  }, [totalCount.count])

  if(totalCount.loading) return "Loading COunt"

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
        }}
        actions={[
          {
            icon: 'pageview',
            tooltip: 'View appraisal details',
            onClick: manageLease,
          },
        ]}
      />
    </div>
  );
};

LeasesTable.propTypes = {
  me: mePropTypes,
  where: PropTypes.object,
  orderBy: PropTypes.object,
};

export default LeasesTable;
