import gql from 'graphql-tag';
import { PropertyInfoFragment } from '../fragments/propertyInfo';

const SINGLE_LEASE_QUERY = gql`
  query SINGLE_LEASE_QUERY($where: PropertyLeaseWhereUniqueInput!) {
    myLease(where: $where) {
      property {
        ...propertyInfo
      }
      id
      location
      rent
      finalised
      lessees {
        id
        signed
        user {
          id
          email
        }
      }
      lessors {
        id
        signed
        user {
          id
          email
        }
      }
    }
  }
  ${PropertyInfoFragment}
`;
export { SINGLE_LEASE_QUERY };
