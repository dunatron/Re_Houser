import gql from 'graphql-tag';

const CONTACT_SUBMISSIONS_COUNT_QUERY = gql`
  query CONTACT_SUBMISSIONS_COUNT_QUERY(
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
    }
  }
`;
export { CONTACT_SUBMISSIONS_COUNT_QUERY };
export default CONTACT_SUBMISSIONS_COUNT_QUERY;
