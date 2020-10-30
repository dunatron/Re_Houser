import gql from 'graphql-tag';
import { PropertyLeaseInfoFragment } from '../fragments/propertyLeaseInfo';

const SINGLE_LEASE_QUERY = gql`
  query SINGLE_LEASE_QUERY($where: PropertyLeaseWhereUniqueInput!) {
    myLease(where: $where) {
      ...propertyLeaseInfo
    }
  }
  ${PropertyLeaseInfoFragment}
`;

export { SINGLE_LEASE_QUERY };
