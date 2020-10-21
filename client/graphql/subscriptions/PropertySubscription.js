import gql from 'graphql-tag';
import * as fragments from '../fragments';

const PROPERTY_SUBSCRIPTION = gql`
  subscription propertySub($where: PropertySubscriptionWhereInput) {
    propertySub(where: $where) {
      node {
        ...propertyInfo
      }
      updatedFields
    }
  }
  ${fragments.PropertyInfoFragment}
`;

export { PROPERTY_SUBSCRIPTION };
