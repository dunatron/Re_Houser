import gql from 'graphql-tag';
import * as fragments from '../fragments';

const PROPERTY_LEASE_SUBSCRIPTION = gql`
  subscription propertyLeaseSub($where: PropertyLeaseSubscriptionWhereInput) {
    propertyLeaseSub(where: $where) {
      node {
        ...propertyLeaseInfo
      }
    }
  }
  ${fragments.PropertyLeaseInfoFragment}
`;

export { PROPERTY_LEASE_SUBSCRIPTION };
export default PROPERTY_LEASE_SUBSCRIPTION;
