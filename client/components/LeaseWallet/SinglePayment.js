import React, { useRef, useState } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Loader from '../Loader';
import Error from '../ErrorMessage';

const SINGLE_PAYMENT_QUERY = gql`
  query SINGLE_PAYMENT_QUERY($where: PaymentWhereUniqueInput!) {
    payment(where: $where) {
      id
      userId
      bankName
      bankBranch
      bankAccount
      bankRef
      type
      leaseId
      propertyId
      stripePaymentId
      object
      amount
      createdAt
      description
      status
    }
  }
`;

const SinglePayment = ({ paymentId }) => {
  const { data, loading, error } = useQuery(SINGLE_PAYMENT_QUERY, {
    variables: {
      where: {
        id: paymentId,
      },
    },
  });
  if (loading)
    return <Loader loading={loading} text="fetching payment details" />;
  if (error) return <Error error={error} />;
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default SinglePayment;
