import gql from 'graphql-tag';
import { SuccessMessageFragment } from '../fragments/rentalAppraisalInfo';

const INVITE_USER_MUTATION = gql`
  mutation OFFER_RENTAL_APPRAISAL_MUTATION($data: InviteUserParams!) {
    inviteUser(data: $data) {
      ...successMessageInfo
    }
  }
  ${SuccessMessageFragment}
`;

export { INVITE_USER_MUTATION };
