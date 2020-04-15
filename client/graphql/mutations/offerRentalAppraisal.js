import gql from 'graphql-tag';
import { RentalAppraisalInfoFragment } from '../fragments/rentalAppraisalInfo';

const OFFER_RENTAL_APPRAISAL_MUTATION = gql`
  mutation OFFER_RENTAL_APPRAISAL_MUTATION(
    $data: RentalAppraisalUpdateInput!
    $where: RentalAppraisalWhereUniqueInput!
  ) {
    offerRentalAppraisal(data: $data, where: $where) {
      ...rentalAppraisalInfo
    }
  }
  ${RentalAppraisalInfoFragment}
`;

export { OFFER_RENTAL_APPRAISAL_MUTATION };
