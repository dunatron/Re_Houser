import gql from 'graphql-tag';

const RentalAppraisalInfoFragment = gql`
  fragment rentalAppraisalInfo on RentalAppraisal {
    id
    requestedBy {
      id
      firstName
      email
    }
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
  }
`;

export { RentalAppraisalInfoFragment };
