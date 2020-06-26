import gql from 'graphql-tag';
import { RentalAppraisalInfoFragment } from '../fragments/rentalAppraisalInfo';

const RENTAL_APPRAISALS_CONNECTION_QUERY = gql`
  query RENTAL_APPRAISALS_CONNECTION_QUERY(
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
      pageInfo {
        hasNextPage
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          ...rentalAppraisalInfo
        }
      }
    }
  }
  ${RentalAppraisalInfoFragment}
`;
export { RENTAL_APPRAISALS_CONNECTION_QUERY };
