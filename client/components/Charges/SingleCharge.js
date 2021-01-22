import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Loader from '@/Components/Loader';
import Error from '@/Components/ErrorMessage';

// createdAt: DateTime! @createdAt
// wallet: Wallet @relation(name: "WalletCharges")
// reason: ChargeReason
// amount: Float
// description: String
const SINGLE_CHARGE_QUERY = gql`
  query SINGLE_CHARGE_QUERY($where: ChargeWhereUniqueInput!) {
    charge(where: $where) {
      id
      createdAt
      reason
      amount
      description
    }
  }
`;

const SingleCharge = ({ id }) => {
  const { data, loading, error } = useQuery(SINGLE_CHARGE_QUERY, {
    variables: {
      where: {
        id: id,
      },
    },
  });
  if (loading)
    return <Loader loading={loading} text="fetching charge details" />;
  if (error) return <Error error={error} />;
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

SingleCharge.propTypes = {
  id: PropTypes.any,
};

export default SingleCharge;
