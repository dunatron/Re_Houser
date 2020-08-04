import gql from 'graphql-tag';
import { RentalAppraisalInfoFragment } from '../fragments/rentalAppraisalInfo';

// where: RentalAppraisalWhereInput
// orderBy: RentalAppraisalOrderByInput
// skip: Int
// after: String
// before: String
// first: Int
// last: Int
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
