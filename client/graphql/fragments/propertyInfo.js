import gql from 'graphql-tag';
import { FileInfoFragment } from './fileInfo';
import { PublicUserInfoFragment } from './publicUserInfo';
import { AccommodationInfoFragment } from './accommodationInfo';

const PropertyInfoFragment = gql`
  fragment propertyInfo on Property {
    id
    placeId
    type
    createdAt
    updatedAt
    moveInDate
    expiryDate
    onTheMarket
    isLeased
    lastLeaseId
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
    creator {
      ...publicUserInfo
    }
    owners {
      ...publicUserInfo
    }
    accommodation {
      ...accommodationInfo
    }
    insulationForm {
      id
    }
    images {
      ...fileInfo
    }
    rehouserStamp
  }
  ${FileInfoFragment}
  ${PublicUserInfoFragment}
  ${AccommodationInfoFragment}
`;

export { PropertyInfoFragment };
export default PropertyInfoFragment;
