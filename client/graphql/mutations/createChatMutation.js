import gql from 'graphql-tag';

const CREATE_CHAT_MUTATION = gql`
  mutation CREATE_CHAT_MUTATION($data: ChatCreateInput!) {
    createChat(data: $data) {
      id
      name
      type
      lastMessage {
        id
        isMine
      }
      participants {
        id
        firstName
        lastName
        profilePhoto {
          filename
          url
        }
      }
    }
  }
`;

export { CREATE_CHAT_MUTATION };
