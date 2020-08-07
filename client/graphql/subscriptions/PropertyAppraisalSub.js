import gql from 'graphql-tag';

const PROPERTY_APPRAISAL_SUBSCRIPTION = gql`
  subscription($where: RentalAppraisalSubscriptionWhereInput) {
    rentalAppraisalSub(where: $where) {
      mutation
      node {
        id
        requestedBy {
          id
          firstName
          lastName
        }
        location
        locationLat
        locationLng
        rooms
        bathrooms
        garageSpaces
        heatSources
        rent
        rentValueAccepted
        acceptTerms
        property {
          id
        }
      }
      updatedFields
      previousValues {
        id
        rent
      }
    }
  }
`;

export { PROPERTY_APPRAISAL_SUBSCRIPTION };
