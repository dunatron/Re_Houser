import React, { useRef, useState } from 'react';
import gql from 'graphql-tag';
import { useApolloClient, useQuery, useSubscription } from '@apollo/client';

import MaterialTable from 'material-table';
import { Button, Input, Typography } from '@material-ui/core';
import Modal from '../Modal/index';
import SinglePayment from './SinglePayment';
import { PAYMENT_SUBSCRIPTION } from '../../graphql/subscriptions/PaymentSubscription';

//https://medium.com/@harshverma04111989/material-table-with-graphql-remote-data-approach-f05298e1d670
//https://github.com/harshmons/material-table-with-graphql-using-remote-data-approach
const PAYMENTS_COUNT_QUERY = gql`
  query PAYMENTS_COUNT_QUERY(
    $where: PaymentWhereInput
    $orderBy: PaymentOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    paymentsConnection(
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

const PAYMENTS_QUERY = gql`
  query PAYMENTS_QUERY(
    $where: PaymentWhereInput
    $orderBy: PaymentOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    paymentsConnection(
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
          status
        }
      }
    }
  }
`;

// id: ID!
// wallet: Wallet
// userId: ID!
// bankName: String
// bankBranch: String
// bankAccount: String
// bankRef: String
// type: PaymentType
// leaseId: ID
// propertyId: ID
// stripePaymentId: String
// object: JSON
// amount: Float
// created: DateTime
// description: String
// status: String

// payments(
//     where: PaymentWhereInput
//     orderBy: PaymentOrderByInput
//     skip: Int
//     after: String
//     before: String
//     first: Int
//     last: Int
//     ): [Payment]!

const tableColumnConfig = [
  {
    title: 'ID',
    field: 'id',
  },
  {
    title: 'amount',
    field: 'amount',
  },
  {
    title: 'createdAt',
    field: 'createdAt',
  },
  {
    title: 'status',
    field: 'status',
  },
];

const PaymentsTable = ({ where, walletId }) => {
  const client = useApolloClient();
  const tableRef = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalPaymentId, setModalPaymentId] = useState(null);
  const [networkOnly, setNetworkOnly] = useState(false);

  // could also subscribe to wallet payments.
  // perhaps it simply refetches?
  const { data, loading, error, refetch } = useQuery(PAYMENTS_COUNT_QUERY, {
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

  const paymentSub = useSubscription(PAYMENT_SUBSCRIPTION, {
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

  console.log('paymentSub.loading => ', paymentSub.loading);
  console.log('paymentSub.data => ', paymentSub.data);

  if (loading) return 'need to know total count';
  const totalPaymentsCount = data.paymentsConnection.aggregate.count;

  const handleSearchTextChange = e => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    tableRef.current.onQueryChange(); // informs table that we need to refetch remoteData
  };

  const handleViewSinglePayment = (e, rowData) => {
    console.log('rowData => ', rowData);
    setModalPaymentId(rowData.id);
    setModalIsOpen(true);
  };

  const remoteData = query => {
    console.log('Query object - ', query);
    console.log('Fetching with networkOnly => ', networkOnly);
    return client
      .query({
        query: PAYMENTS_QUERY,
        // fetchPolicy: 'network-only', // simply for subscriptions...
        fetchPolicy: networkOnly ? 'network-only' : 'cache-first', // who needs a tradeoff when your a god
        variables: {
          //   orderBy: 'created_ASC',
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
          //   orderBy: 'amount_DESC',
          skip: query.page * query.pageSize,
          first: query.pageSize,
          limit: query.pageSize,
        },
      })
      .then(res => {
        console.log('edges query for payments => ', res);
        const {
          data: {
            paymentsConnection: { pageInfo, aggregate, edges },
          },
        } = res;
        // immutatble/freezeObject
        const formattedData = edges.map(edge => ({
          ...edge.node,
        }));
        return {
          data: formattedData,
          page: query.page,
          totalCount: totalPaymentsCount,
        };
      })
      .finally(() => {
        setNetworkOnly(false);
      });
  };

  return (
    <div>
      <Input value={searchText} onChange={handleSearchTextChange} />
      <Typography>Note: searches across, paymentId and amount</Typography>
      <Button onClick={handleSearch}>Fire search</Button>
      <Modal
        open={modalIsOpen}
        close={() => setModalIsOpen(false)}
        disableBackdrop={true}>
        <SinglePayment paymentId={modalPaymentId} />
      </Modal>
      <MaterialTable
        tableRef={tableRef}
        columns={tableColumnConfig}
        data={remoteData}
        options={{
          toolbar: false, // This will disable the in-built toolbar where search is one of the functionality
        }}
        actions={[
          {
            icon: 'visibility',
            tooltip: 'View payment details',
            onClick: handleViewSinglePayment,
          },
        ]}
      />
    </div>
  );
};

export default PaymentsTable;
