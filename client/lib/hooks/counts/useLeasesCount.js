import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import PROPERTY_LEASE_SUBSCRIPTION from '@/Gql/subscriptions/PropertyLeaseSub';

const aggregateFields = gql`
  fragment aggregateFields on PropertyLeaseConnection {
    aggregate {
      count
    }
  }
`;

const PROPERTY_LEASES_CONNECTION_COUNT = gql`
  query PROPERTY_LEASES_CONNECTION_COUNT(
    $where: PropertyLeaseWhereInput
    $orderBy: PropertyLeaseOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    propertyLeasesConnection(
      where: $where
      orderBy: $orderBy
      skip: $skip
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      ...aggregateFields
    }
  }
  ${aggregateFields}
`;

const useLeasesCount = variables => {
  const { data, loading, error, refetch, subscribeToMore } = useQuery(
    PROPERTY_LEASES_CONNECTION_COUNT,
    {
      variables,
    }
  );

  subscribeToMore({
    document: PROPERTY_LEASE_SUBSCRIPTION,
    // variables: { postID: params.postID },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      // toast("WOW") // seems to fire heaps of times...
      refetch();
      return prev;
    },
  });
  return {
    count: data ? data.propertyLeasesConnection.aggregate.count : undefined,
    data,
    error,
    loading,
  };
};

export { useLeasesCount };
export default useLeasesCount;
