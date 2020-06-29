//propertySub

import gql from 'graphql-tag';

const PROPERTY_SUBSCRIPTION = gql`
  subscription($where: PropertySubscriptionWhereInput) {
    propertySub(where: $where) {
      node {
        id
      }
      updatedFields
    }
  }
`;

export { PROPERTY_SUBSCRIPTION };
