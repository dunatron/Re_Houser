import gql from "graphql-tag"
import { RentalApplicationInfoFragment } from "../fragments/rentalApplicationInfo"
import { PropertyInfoFragment } from "../fragments/propertyInfo"

const SINGLE_OWNER_PROPERTY_QUERY = gql`
  query SINGLE_OWNER_PROPERTY_QUERY($id: ID!) {
    ownerProperty(id: $id) {
      ...propertyInfo
      rentalApplications {
        ...rentalApplicationInfo
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
  ${RentalApplicationInfoFragment}
`
export { SINGLE_OWNER_PROPERTY_QUERY }
