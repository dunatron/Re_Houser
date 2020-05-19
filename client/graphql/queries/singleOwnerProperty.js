import gql from 'graphql-tag';
import { PropertyInfoFragment } from '../fragments/propertyInfo';
import { FileInfoFragment } from '../fragments/fileInfo';

const SINGLE_OWNER_PROPERTY_QUERY = gql`
  query SINGLE_OWNER_PROPERTY_QUERY($id: ID!) {
    ownerProperty(id: $id) {
      ...propertyInfo
      owners {
        id
        email
        firstName
      }
      images {
        ...fileInfo
      }
    }
  }
  ${PropertyInfoFragment}
  ${FileInfoFragment}
`;
export { SINGLE_OWNER_PROPERTY_QUERY };
