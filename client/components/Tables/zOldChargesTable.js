import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import gql from 'graphql-tag';
import { useApolloClient, useQuery, useSubscription } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import { Input, Typography, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Modal from '@/Components/Modal/index';
import SinglePayment from '@/Components/Payments/SinglePayment';
import { CHARGE_SUBSCRIPTION } from '../../graphql/subscriptions/ChargeSubscription';
import moment from 'moment';
import formatCentsToDollars from '../../lib/formatCentsToDollars';

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
const CHARGES_COUNT_QUERY = gql`
  query CHARGES_COUNT_QUERY(
    $where: ChargeWhereInput
    $orderBy: ChargeOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    chargesConnection(
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

const CHARGES_QUERY = gql`
  query CHARGES_QUERY(
    $where: ChargeWhereInput
    $orderBy: ChargeOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    chargesConnection(
      where: $where
      orderBy: $orderBy
      skip: $skip
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      aggregate {
        count
      }
      edges {
        node {
          id
          amount
          createdAt
          description
        }
      }
    }
  }
`;

const ChargesTable = ({ where, walletId }) => {
  const classes = useStyles();
  const client = useApolloClient();
  const tableRef = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [networkOnly, setNetworkOnly] = useState(false);

  const tableColumnConfig = [
    {
      title: 'ID',
      field: 'id',
    },
    {
      title: 'amount',
      field: 'amount',
      render: rowData => formatCentsToDollars(rowData.amount, 'charge'),
    },
    {
      title: 'createdAt',
      field: 'createdAt',
      render: rowData => {
        return (
          <Typography>
            {moment(rowData.createdAt).format('MM-DD-YYYY')}
          </Typography>
        );
      },
    },
    {
      title: 'description',
      field: 'description',
    },
  ];

  const { data, loading, error, refetch } = useQuery(CHARGES_COUNT_QUERY, {
    variables: {
      where: {
        ...where,
      },
    },
  });

  const handleOnSubscriptionData = () => {
    setNetworkOnly(true);
    tableRef.current.onQueryChange();
  };

  const chargesSub = useSubscription(CHARGE_SUBSCRIPTION, {
    onSubscriptionData: handleOnSubscriptionData,
    variables: {
      where: {
        node: {
          wallet: {
            id: walletId,
          },
        },
      },
    },
  });

  if (loading) return 'need to know total count';
  const totalChargesCount = data.chargesConnection.aggregate.count;

  const handleSearchTextChange = e => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    tableRef.current.onQueryChange(); // informs table that we need to refetch remoteData
  };

  const remoteData = query => {
    return client
      .query({
        query: CHARGES_QUERY,
        fetchPolicy: networkOnly ? 'network-only' : 'cache-first', // who needs a tradeoff when your a god
        variables: {
          where: {
            ...where,
            OR: [
              {
                id_contains: searchText,
              },
              {
                amount: parseFloat(searchText),
              },
            ],
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
            chargesConnection: { pageInfo, aggregate, edges },
          },
        } = res;
        const formattedData = edges.map(edge => ({
          ...edge.node,
        }));
        return {
          data: formattedData,
          page: query.page,
          totalCount: totalChargesCount,
        };
      })
      .finally(() => {
        setNetworkOnly(false);
      });
  };

  return (
    <div className={classes.root}>
      <div className={classes.tableHeader}>
        <Typography variant="h5">Charges</Typography>
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

ChargesTable.propTypes = {
  walletId: PropTypes.any,
  where: PropTypes.any,
};

export default ChargesTable;
