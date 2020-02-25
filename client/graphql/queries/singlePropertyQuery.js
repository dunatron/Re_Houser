import gql from 'graphql-tag';
import { PropertyInfoFragment } from '../fragments/propertyInfo';

const SINGLE_PROPERTY_QUERY = gql`
  query SINGLE_PROPERTY_QUERY($where: PropertyWhereUniqueInput!) {
    property(where: $where) {
      ...propertyInfo
      accommodation {
        id
        roomSize
        description
        rent
        expenses
      }
      owners {
        id
        email
        firstName
      }
      images {
        id
        filename
        url
      }
    }
  }
  ${PropertyInfoFragment}
`;
export { SINGLE_PROPERTY_QUERY };
