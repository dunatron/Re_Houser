import gql from 'graphql-tag';
import { PropertyInfoFragment } from '../fragments/propertyInfo';

const PropertyLeaseInfoFragment = gql`
  fragment propertyLeaseInfo on PropertyLease {
    id
    stage
    updatedAt
    createdAt
    property {
      ...propertyInfo
    }
    lessees {
      id
      signed
      user {
        id
        email
        firstName
        lastName
      }
    }
    lessors {
      id
      signed
      user {
        id
        email
        firstName
        lastName
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
    location
    locationLat
    locationLng
    wallet {
      id
      amount
    }
  }
  ${PropertyInfoFragment}
`;

export { PropertyLeaseInfoFragment };
export default PropertyLeaseInfoFragment;
