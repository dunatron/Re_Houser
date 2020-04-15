import gql from 'graphql-tag';

const CREATE_RENTAL_APPRAISAL_MUTATION = gql`
  mutation CREATE_RENTAL_APPRAISAL_MUTATION(
    $data: RentalAppraisalCreateInput!
  ) {
    createRentalAppraisal(data: $data) {
      id
    }
  }
`;

export { CREATE_RENTAL_APPRAISAL_MUTATION };
