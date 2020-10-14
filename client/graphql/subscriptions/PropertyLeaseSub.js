import gql from 'graphql-tag';

const PROPERTY_LEASE_SUBSCRIPTION = gql`
  subscription($where: PropertyLeaseSubscriptionWhereInput) {
    propertyLeaseSub(where: $where) {
      node {
        id
        stage
      }
    }
  }
`;

export { PROPERTY_LEASE_SUBSCRIPTION };
export default PROPERTY_LEASE_SUBSCRIPTION