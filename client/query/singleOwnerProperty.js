import gql from "graphql-tag"
import { PropertyInfoFragment } from "../fragments/propertyInfo"

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
        id
        filename
        url
      }
    }
  }
  ${PropertyInfoFragment}
`
export { SINGLE_OWNER_PROPERTY_QUERY }
