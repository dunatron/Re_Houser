import gql from 'graphql-tag';
import { RentalAppraisalInfoFragment } from '../fragments/index';

const UPDATE_RENTAL_APPRAISAL_MUTATION = gql`
  mutation updateRentalAppraisal(
    $data: RentalAppraisalUpdateInput!
    $where: RentalAppraisalWhereUniqueInput!
  ) {
    updateRentalAppraisal(data: $data, where: $where) {
      ...rentalAppraisalInfo
    }
  }
  ${RentalAppraisalInfoFragment}
`;

export { UPDATE_RENTAL_APPRAISAL_MUTATION };
