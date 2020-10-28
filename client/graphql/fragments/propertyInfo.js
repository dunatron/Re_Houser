// import gql from 'graphql-tag';
import { gql } from '@apollo/client';
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
    insulationStatementFile {
      id
      ...fileInfo
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
    agents {
      ...publicUserInfo
    }
    images {
      ...fileInfo
    }
    files {
      id
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
    rehouserManaged
  }
  ${FileInfoFragment}
  ${PublicUserInfoFragment}
  ${AccommodationInfoFragment}
`;

export { PropertyInfoFragment };
export default PropertyInfoFragment;
