// updateInspection
import gql from 'graphql-tag';
import * as fragments from '../fragments';

const UPDATE_CONTACT_SUBMISSION_MUTATION = gql`
  mutation updateInspection(
    $data: ContactSubmissionUpdateInput!
    $where: ContactSubmissionWhereUniqueInput!
  ) {
    updateContactSubmission(data: $data, where: $where) {
      ...contactSubmissionInfo
    }
  }
  ${fragments.ContactSubmissionInfoFragment}
`;

export { UPDATE_CONTACT_SUBMISSION_MUTATION };
export default UPDATE_CONTACT_SUBMISSION_MUTATION;
