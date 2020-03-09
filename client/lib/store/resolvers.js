import gql from 'graphql-tag';

export const schema = gql`
  extend type Chat {
    isOpen: Boolean!
  }
`;

export const GET_OPEN_CHATS = gql`
  {
    openChats @client {
      id
      type
      participants {
        id
        firstName
        lastName
        __typename
        profilePhoto {
          filename
          url
        }
      }
      __typename
    }
  }
`;

export const OPEN_CHAT_LOCAL_MUTATION = gql`
  mutation OPEN_CHAT_LOCAL_MUTATION($chat: Chat) {
    openChat(chat: $chat) @client
  }
`;

export const CLOSE_CHAT_LOCAL_MUTATION = gql`
  mutation OPEN_CHAT_LOCAL_MUTATION($id: Int!) {
    closeChat(id: $id) @client
  }
`;

/**
 * Note cahce.writeData has been removed and will need to be changed here
 * https://www.apollographql.com/docs/react/v3.0-beta/migrating/apollo-client-3-migration/
 */
const resolvers = () => {
  return {
    Mutation: {
      openChat(_, variables, { cache }) {
        const { openChats } = cache.readQuery({
          query: GET_OPEN_CHATS,
        });
        const foundChat = openChats.find(c => c.id === variables.chat.id);

        if (foundChat) {
          // alert("its cool already in bar, return  early")
          return;
        }
        console.log('Tell me of these open chats again => ', variables.chat);
        const data = {
          data: {
            openChats: [
              ...openChats,
              {
                id: variables.chat.id,
                type: variables.chat.type,
                participants: variables.chat.participants,
                __typename: 'OpenChat',
              },
            ],
          },
        };
        cache.writeData(data);
      },
      closeChat(_, variables, { cache }) {
        const { openChats } = cache.readQuery({
          query: GET_OPEN_CHATS,
        });
        const filteredChats = openChats.filter(c => c.id !== variables.id);
        const data = {
          data: {
            openChats: [...filteredChats],
          },
        };
        cache.writeData(data);
      },
    },
  };
};

export default resolvers;
