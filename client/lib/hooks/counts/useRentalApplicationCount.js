import { useQuery, } from '@apollo/client';
import gql from 'graphql-tag';
import {RENTAL_APPLICATION_SUBSCRIPTION} from "@/Gql/subscriptions/RentalApplicationSub"

const aggregateFields = gql`
  fragment aggregateFields on RentalApplicationConnection {
    aggregate {
      count
    }
  }
`;

const RENTAL_APPLICATIONS_CONNECTION = gql`
  query RENTAL_APPLICATIONS_CONNECTION(
    $where: RentalApplicationWhereInput
    $orderBy: RentalApplicationOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    rentalApplicationsConnection(
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

const useRentalApplicationCount = (variables) => {
  const { data, loading, error,  refetch, subscribeToMore } = useQuery(RENTAL_APPLICATIONS_CONNECTION, {
      variables: {
          ...variables, 
      }
  });

  subscribeToMore({
    document: RENTAL_APPLICATION_SUBSCRIPTION,
    // variables: { postID: params.postID },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      // toast("WOW") // seems to fire heaps of times...
      refetch()
      return prev 
    }
  })
  return {
    count: data ? data.rentalApplicationsConnection.aggregate.count: undefined,
    data,
    error,
    loading,
  };
};

export {useRentalApplicationCount}
export default useRentalApplicationCount
