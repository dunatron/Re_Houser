import gql from 'graphql-tag';
import { PublicUserInfoFragment } from './publicUserInfo';

const RentalAppraisalInfoFragment = gql`
  fragment rentalAppraisalInfo on RentalAppraisal {
    id
    createdAt
    requestedBy {
      ...publicUserInfo
    }
    appraisedBy {
      ...publicUserInfo
    }
    placeId
    location
    locationLat
    locationLng
    rooms
    bathrooms
    heatSources
    rent
    rentValueAccepted
    acceptTerms
    property {
      id
      location
    }
    hasBeenUsed
  }
  ${PublicUserInfoFragment}
`;

export { RentalAppraisalInfoFragment };

export default RentalAppraisalInfoFragment;
