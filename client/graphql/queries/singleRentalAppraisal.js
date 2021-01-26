import gql from 'graphql-tag';
import { RentalAppraisalInfoFragment } from '../fragments/rentalAppraisalInfo';

const SINGLE_RENTAL_APPRAISAL_QUERY = gql`
  query SINGLE_RENTAL_APPRAISAL_QUERY(
    $where: RentalAppraisalWhereUniqueInput!
  ) {
    rentalAppraisal(where: $where) {
      ...rentalAppraisalInfo
    }
  }
  ${RentalAppraisalInfoFragment}
`;
export { SINGLE_RENTAL_APPRAISAL_QUERY };
