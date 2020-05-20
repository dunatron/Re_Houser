import gql from 'graphql-tag';
import { PropertyInfoFragment } from '../fragments';

const PROPERTIES_QUERY = gql`
  query PROPERTIES_QUERY {
    properties {
      ...propertyInfo
    }
  }
  ${PropertyInfoFragment}
`;
export { PROPERTIES_QUERY };
