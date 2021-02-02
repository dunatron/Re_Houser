import gql from 'graphql-tag';
import { ContactSubmissionInfoFragment } from '../fragments/contactSubmissionInfo';

const CONTACT_SUBMISSIONS_CONNECTION_QUERY = gql`
  query CONTACT_SUBMISSIONS_CONNECTION_QUERY(
    $where: ContactSubmissionWhereInput
    $orderBy: ContactSubmissionOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    contactSubmissionsConnection(
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
          ...contactSubmissionInfo
        }
      }
    }
  }
  ${ContactSubmissionInfoFragment}
`;
export { CONTACT_SUBMISSIONS_CONNECTION_QUERY };
