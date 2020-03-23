import gql from 'graphql-tag';

import { PropertyLeaseInfoFragment } from '../fragments/propertyLeaseInfo';

const UPDATE_PROPERTY_LEASE_MUTATION = gql`
  mutation updatePropertyLease(
    $data: PropertyLeaseUpdateInput!
    $where: PropertyLeaseWhereUniqueInput!
  ) {
    updatePropertyLease(data: $data, where: $where) {
      ...propertyLeaseInfo
    }
  }
  ${PropertyLeaseInfoFragment}
`;

export { UPDATE_PROPERTY_LEASE_MUTATION };
