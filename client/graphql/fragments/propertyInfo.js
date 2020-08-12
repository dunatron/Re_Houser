import gql from 'graphql-tag';
import { FileInfoFragment } from './fileInfo';
import { PublicUserInfoFragment } from './publicUserInfo';
import { AccommodationInfoFragment } from './accommodationInfo';

const PropertyInfoFragment = gql`
  fragment propertyInfo on Property {
    id
    placeId
    location
    locationLat
    locationLng
    updatedAt
    createdAt
    type
    headline
    rooms
    maximumOccupants
    rent
    lowestRoomPrice
    highestRoomPrice
    useAdvancedRent
    accommodation {
      ...accommodationInfo
    }
    bathrooms
    garageSpaces
    carportSpaces
    offStreetSpaces
    insulationForm {
      id
    }
    outdoorFeatures
    indoorFeatures
    heatSources
    moveInDate
    expiryDate
    leaseLengthInMonths
    onTheMarket
    owners {
      ...publicUserInfo
    }
    creator {
      ...publicUserInfo
    }
    images {
      ...fileInfo
    }
    acceptedTerms
    isLeased
    lastLeaseId
    leaseExpiryDate
    rehouserStamp
    tenancyType
    petsAllowed
    pets
    chattels
    landlordProtectionCover
    freeGlassCover
    workingAlarms
    inHallway3mOfEachBedroom
    tenYearPhotoelectricAlarms
    alarmsEachLevel
    proofOfOwnership {
      ...fileInfo
    }
    bankDetails {
      name
      bankNumber
      branchNumber
      accountNumber
      suffix
    }
  }
  ${FileInfoFragment}
  ${PublicUserInfoFragment}
  ${AccommodationInfoFragment}
`;

export { PropertyInfoFragment };
export default PropertyInfoFragment;
