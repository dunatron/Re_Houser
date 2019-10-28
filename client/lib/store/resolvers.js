import gql from 'graphql-tag';

const LOCAL_STATE_QUERY = gql`
  query {
    openChats @client {
      id
      name
      __typename
    }
  }
`;

export const schema = gql`
  extend type Chat {
    isOpen: Boolean!
  }
`;

// perhaps this one can perform the seen...
const OPEN_CHAT_LOCAL_MUTATION = gql`
  mutation {
    openChat @client
  }
`;

const resolvers = () => {
  return {
    Mutation: {
      openChat(_, variables, { cache }) {
        // read the current open chats to see if we already have it. we essentially just wantto add it...
        // this list will simply go through
        // chats are going to be attahced to the user. When you login, it returns all of your chats...
        // it will be a paginated async thing
        // this will then be device secific holding the open chats for the chat bar.
        // How to introduce a messages seen...
        console.log('variables for openBar chat => ', variables);
        const { openChats } = cache.readQuery({
          query: LOCAL_STATE_QUERY,
        });

        const foundChat = openChats.find(c => c.id === variables.id);

        if (foundChat) {
          // alert("its cool already in bar, return  early")
          return;
        }

        const data = {
          data: {
            openChats: [
              ...openChats,
              {
                id: variables.id,
                name: 'test',
                __typename: 'OpenChat',
              },
            ],
          },
        };
        cache.writeData(data);
      },
      closeChat(_, variables, { cache }) {
        const { openChats } = cache.readQuery({
          query: LOCAL_STATE_QUERY,
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
