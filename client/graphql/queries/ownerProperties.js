import gql from 'graphql-tag';

import { PropertyInfoFragment } from '../fragments';

const OWNER_PROPERTIES_QUERY = gql`
  query OWNER_PROPERTIES_QUERY {
    ownerProperties {
      ...propertyInfo
    }
  }
  ${PropertyInfoFragment}
`;

export { OWNER_PROPERTIES_QUERY };
