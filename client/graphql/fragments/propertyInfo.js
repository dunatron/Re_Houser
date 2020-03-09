import gql from 'graphql-tag';
const PropertyInfoFragment = gql`
  fragment propertyInfo on Property {
    id
    type
    rooms
    rent
    moveInDate
    expiryDate
    onTheMarket
    location
    locationLat
    locationLng
    carportSpaces
    garageSpaces
    offStreetSpaces
    outdoorFeatures
    indoorFeatures
    accommodation {
      id
      rent
      description
    }
  }
`;

export { PropertyInfoFragment };
