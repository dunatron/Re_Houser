import gql from 'graphql-tag';

const CREATE_CHAT_MUTATION = gql`
  mutation CREATE_CHAT_MUTATION($data: ChatCreateInput!) {
    createChat(data: $data) {
      id
      name
      lastMessage {
        id
        isMine
      }
      participants {
        id
      }
    }
  }
`;

export { CREATE_CHAT_MUTATION };
