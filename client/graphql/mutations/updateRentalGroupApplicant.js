import gql from 'graphql-tag';
import { RentalGroupApplicantInfoFragment } from '../fragments/rentalGroupApplicantInfo';

const UPDATE_RENTAL_GROUP_APPLICANT_MUTATION = gql`
  mutation updateRentalGroupApplicant(
    $data: RentalGroupApplicantUpdateInput!
    $where: RentalGroupApplicantWhereUniqueInput!
  ) {
    updateRentalGroupApplicant(data: $data, where: $where) {
      ...rentalGroupApplicantInfo
    }
  }
  ${RentalGroupApplicantInfoFragment}
`;

export { UPDATE_RENTAL_GROUP_APPLICANT_MUTATION };
