import * as fragments from '../fragments';
import gql from 'graphql-tag';

const CREATE_MESSAGE_MUTATION = gql`
  mutation CREATE_MESSAGE_MUTATION($data: MessageCreateInput!) {
    createMessage(data: $data) {
      ...Message
    }
  }
  ${fragments.message}
`;
export { CREATE_MESSAGE_MUTATION };
