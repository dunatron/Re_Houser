import gql from 'graphql-tag';
import { PublicUserInfoFragment } from './publicUserInfo';

const RentalAppraisalInfoFragment = gql`
  fragment rentalAppraisalInfo on RentalAppraisal {
    id
    createdAt
    requestedBy {
      ...publicUserInfo
    }
    location
    locationLat
    locationLng
    rooms
    bathrooms
    heatSources
    rent
    lowRent
    highRent
    rentValueAccepted
    acceptTerms
    property {
      id
      location
    }
  }
  ${PublicUserInfoFragment}
`;

export { RentalAppraisalInfoFragment };
