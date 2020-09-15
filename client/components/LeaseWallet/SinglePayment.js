import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Loader from '@/Components/Loader';
import Error from '@/Components/ErrorMessage';

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

SinglePayment.propTypes = {
  paymentId: PropTypes.any.isRequired,
};

export default SinglePayment;
