import gql from "graphql-tag"

const PROPERTIES_QUERY = gql`
  query PROPERTIES_QUERY {
    properties {
      id
      rooms
      rent
      accommodation {
        id
        roomSize
        rent
        expenses
        description
      }
      moveInDate
      onTheMarket
      location
      locationLat
      locationLng
      owners {
        id
        email
        firstName
      }
      images {
        url
      }
    }
  }
`
export { PROPERTIES_QUERY }
