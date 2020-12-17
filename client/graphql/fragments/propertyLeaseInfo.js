import gql from 'graphql-tag';
import { PropertyInfoFragment } from '../fragments/propertyInfo';

const PropertyLeaseInfoFragment = gql`
  fragment propertyLeaseInfo on PropertyLease {
    id
    stage
    tenancyType
    updatedAt
    createdAt
    property {
      ...propertyInfo
    }
    lessees {
      id
      signed
      signedAt
      user {
        id
        email
        firstName
        lastName
        dob
        signature {
          id
          url
        }
      }
    }
    lessors {
      id
      signed
      signedAt
      user {
        id
        email
        firstName
        lastName
        dob
        signature {
          id
          url
        }
      }
    }
    rooms
    bathrooms
    garageSpaces
    carportSpaces
    offStreetSpaces
    indoorFeatures
    outdoorFeatures
    rent
    moveInDate
    expiryDate
    leaseLengthInMonths
    location
    locationLat
    locationLng
    wallet {
      id
      amount
    }
    bondType
    petsAllowed
    pets
    maximumOccupants
    chattels
  }
  ${PropertyInfoFragment}
`;

export { PropertyLeaseInfoFragment };
export default PropertyLeaseInfoFragment;
