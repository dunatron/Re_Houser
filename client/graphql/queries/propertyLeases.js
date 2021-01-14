import gql from 'graphql-tag';
import { PropertyLeaseInfoFragment } from '../fragments';

const PROPERTY_LEASES_QUERY = gql`
  query PROPERTY_LEASES_QUERY($where: PropertyLeaseWhereInput) {
    propertyLeases(where: $where) {
      ...propertyLeaseInfo
    }
  }
  ${PropertyLeaseInfoFragment}
`;

export { PROPERTY_LEASES_QUERY };
