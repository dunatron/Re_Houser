import gql from "graphql-tag"
const PropertyInfoFragment = gql`
  fragment propertyInfo on Property {
    id
    rooms
    rent
    moveInDate
    onTheMarket
    location
    locationLat
    locationLng
  }
`

export { PropertyInfoFragment }
