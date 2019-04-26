import gql from "graphql-tag"

const SINGLE_OWNER_PROPERTY_QUERY = gql`
  query SINGLE_OWNER_PROPERTY_QUERY($id: ID!) {
    ownerProperty(id: $id) {
      id
      location
      locationLat
      locationLng
      rent
      rooms
      images {
        id
        filename
        url
      }
    }
  }
`
export { SINGLE_OWNER_PROPERTY_QUERY }
