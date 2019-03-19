import gql from "graphql-tag"

const PROPERTIES_QUERY = gql`
  query PROPERTIES_QUERY {
    properties {
      id
      rooms
      rent
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
      rentalApplications {
        id
        applicants {
          id
          firstName
          lastName
          email
        }
      }
    }
  }
`
export { PROPERTIES_QUERY }
