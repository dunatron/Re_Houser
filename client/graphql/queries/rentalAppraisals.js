import gql from 'graphql-tag';
import { RentalAppraisalInfoFragment } from '../fragments/rentalAppraisalInfo';

// where: RentalAppraisalWhereInput
// orderBy: RentalAppraisalOrderByInput
// skip: Int
// after: String
// before: String
// first: Int
// last: Int
const RENTAL_APPRAISALS_QUERY = gql`
  query RENTAL_APPLICATIONS_QUERY(
    $where: RentalAppraisalWhereInput
    $orderBy: RentalAppraisalOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    rentalAppraisals(
      where: $where
      orderBy: $orderBy
      skip: $skip
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      ...rentalAppraisalInfo
    }
  }
  ${RentalAppraisalInfoFragment}
`;
export { RENTAL_APPRAISALS_QUERY };
