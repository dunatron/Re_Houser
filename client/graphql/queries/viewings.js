import gql from 'graphql-tag';
import { ViewingInfoFragment } from '../fragments';

const VIEWINGS_QUERY = gql`
  query VIEWINGS_QUERY(
    $where: ViewingWhereInput
    $orderBy: ViewingOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    viewings(
      where: $where
      orderBy: $orderBy
      skip: $skip
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      ...viewingInfo
    }
  }
  ${ViewingInfoFragment}
`;
export { VIEWINGS_QUERY };
