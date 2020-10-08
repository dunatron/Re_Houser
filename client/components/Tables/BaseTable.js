import React, { useRef, useState, useContext, useEffect } from 'react';
import { store } from '@/Store/index';
import gql from 'graphql-tag';
import { useApolloClient, useQuery, useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import Error from '@/Components/ErrorMessage';
import Loader from '@/Components/Loader';
import { Button, IconButton } from '@material-ui/core';

import { RENTAL_APPRAISALS_CONNECTION_QUERY } from '@/Gql/connections';
import PropTypes from 'prop-types';
import { mePropTypes, propertyPropTypes } from '../../propTypes';
import moment from 'moment';

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
const APPRAISALS_COUNT_QUERY = gql`
  query APPRAISALS_COUNT_QUERY(
    $where: RentalAppraisalWhereInput
    $orderBy: RentalAppraisalOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    rentalAppraisalsConnection(
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

const BaseTable = ({ where, me, orderBy = 'createdAt_ASC' }) => {
  const connectionKey = 'rentalAppraisalsConnection'; // e.g inspectionsConnection
  const connectionQuery = RENTAL_APPRAISALS_CONNECTION_QUERY;
  const globalStore = useContext(store);
  const { dispatch, state } = globalStore;
  const classes = useStyles();
  const client = useApolloClient();
  const tableRef = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [networkOnly, setNetworkOnly] = useState(false);
  const [tableErr, setTableErr] = useState(null);

  const tableColumnConfig = [
    { title: 'location', field: 'location', editable: false },
    {
      title: 'createdAt',
      field: 'createdAt',
      render: rowData => {
        return moment(rowData.createdAt).format('Mo MMM YYYY');
      },
    },
    { title: 'rent', field: 'rent', editable: false },
    { title: 'hasBeenUsed', field: 'hasBeenUsed', editable: false },
  ];

  const sharedWhere = {
    ...where,
  };

  const { data, loading, error, refetch } = useQuery(APPRAISALS_COUNT_QUERY, {
    variables: {
      where: {
        ...where,
      },
      orderBy: orderBy,
    },
  });

  if (loading)
    return <Loader loading={loading} text="Getting total appraisal count" />;

  if (error) return <Error error={error} />;

  const totalItemCount = data ? data[connectionKey].aggregate.count : 0;

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
    client.cache.modify({
      fields: {
        [connectionKey](existingRef, { readField }) {
          // console.log('existingRefs  item => ', existingRef);
          // console.log('existingRefs edges => ', existingRef.edges);
          return existingRef.edges ? {} : existingRef;
        },
      },
    });
    refetch({
      variables: {
        where: {
          ...where,
        },
        orderBy: orderBy,
      },
    });
    await tableRef.current.onQueryChange();
  };

  return (
    <div className={classes.root}>
      <div className={classes.tableHeader}>
        <IconButton onClick={refetchTable}>
          <CachedIcon />
        </IconButton>
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
            tooltip: 'View appraisal details',
          },
        ]}
      />
    </div>
  );
};

BaseTable.propTypes = {
  me: mePropTypes,
  where: PropTypes.object,
  orderBy: PropTypes.object,
};

export default BaseTable;
