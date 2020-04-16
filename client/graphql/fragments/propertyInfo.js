import gql from 'graphql-tag';
const PropertyInfoFragment = gql`
  fragment propertyInfo on Property {
    id
    type
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
    rooms
    rent
    lowestRoomPrice
    highestRoomPrice
    useAdvancedRent
    accommodation {
      id
      rent
      description
    }
    insulationForm {
      id
    }
    rehouserStamp
  }
`;

export { PropertyInfoFragment };
