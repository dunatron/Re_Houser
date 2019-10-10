import gql from 'graphql-tag';

const LOCAL_STATE_QUERY = gql`
  query {
    barChats @client {
      id
      name
    }
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
        const { barChats } = cache.readQuery({
          query: LOCAL_STATE_QUERY,
        });

        console.log('Here are the open chats => ', openChats);

        // Write the cart State to the opposite
        // const data = {
        //   data: { cartOpen: !cartOpen },
        // };
        // cache.writeData(data);
        // return data;
      },
    },
  };
};

export default resolvers;
