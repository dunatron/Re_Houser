import gql from 'graphql-tag';
import * as fragments from '../fragments';

const PROPERTY_APPRAISAL_SUBSCRIPTION = gql`
  subscription rentalAppraisalSub(
    $where: RentalAppraisalSubscriptionWhereInput
  ) {
    rentalAppraisalSub(where: $where) {
      mutation
      node {
        ...rentalAppraisalInfo
      }
      updatedFields
      previousValues {
        id
        rent
      }
    }
  }
  ${fragments.RentalAppraisalInfoFragment}
`;

export { PROPERTY_APPRAISAL_SUBSCRIPTION };
