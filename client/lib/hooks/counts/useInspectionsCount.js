import { useQuery, useSubscription } from '@apollo/client';
import gql from 'graphql-tag';
import INSPECTION_SUBSCRIPTION from "@/Gql/subscriptions/InspectionSubscription"
import {toast} from 'react-toastify'

const aggregateFields = gql`
  fragment aggregateFields on InspectionConnection {
    aggregate {
      count
    }
  }
`;

const INSPECTIONS_CONNECTION_COUNT = gql`
  query INSPECTIONS_CONNECTION_COUNT(
    $where: InspectionWhereInput
    $orderBy: InspectionOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    inspectionsConnection(
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

const useInspectionsCount = (variables) => {

  console.log("updateQuery BEGIN")
  const { data, loading, error, refetch, subscribeToMore } = useQuery(INSPECTIONS_CONNECTION_COUNT, {
    // pollInterval: 10000,
    variables: {
      ...variables
    }, 
  
  });

  subscribeToMore({
    document: INSPECTION_SUBSCRIPTION,
    // variables: { postID: params.postID },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      console.log("updateQuery subscriptionData prev => ", prev )
      console.log("updateQuery subscriptionData => ", subscriptionData)
      toast("WOW")
      refetch()
      return prev 
      // const newFeedItem = subscriptionData.data.commentAdded;
      // return Object.assign({}, prev, {
      //   post: {
      //     comments: [newFeedItem, ...prev.post.comments]
      //   }
      // });
    }
  })


  //could potentailly just do a subscription for creates and delete sthen refetch

  return {
    count: data ? data.inspectionsConnection.aggregate.count: undefined,
    data,
    error,
    loading,
  };
};

export {useInspectionsCount}
export default useInspectionsCount