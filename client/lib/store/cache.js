// import { InMemoryCache } from 'apollo-cache-inmemory';
import { InMemoryCache } from '@apollo/client';
import { offsetLimitPaginatedField } from '../offsetLimitPaginatedField';
const mergeBasicBitch = (existing, incoming, { args }) => {
  return [...(existing || []), ...incoming];
};
const cache = new InMemoryCache({
  // freezeResults: true, // new
  freezeResults: true, // having this as true breaks material table as they mutate results. Having this as true is a must for apollo cache
  // at least in the was of writing the cache mutations. can turn off for production...
  // With Apollo 3.0 we handle much much more here. Which is good
  typePolicies: {
    Query: {
      fields: {
        //chats should be paginated
        // chats: offsetLimitPaginatedField(),
        chats: {
          keyArgs: false,
          merge: mergeBasicBitch(),
        },
        // chats: {
        //   keyArgs: false,
        //   merge(existing, incoming, { args }) {
        //     console.log('Merge on CHATS GGGG...');
        //     console.log('Existsing chats ', existing);
        //     console.log('Incoming chats ', incoming);
        //     return [...(existing || []), ...incoming];
        //   },
        //   read(exisiting, {args})
        // },
        // if this guy is already in the cache right
        chat: {
          read(exisiting, { args, toReference }) {
            return (
              exisiting ||
              toReference({
                __typename: 'Chat',
                isbn: args.isbn,
              })
            );
          },
        },
      },
    },
  },
});

// we need better local Data SERIOUSLY CHECK OUT VIRTUAL FIELDS.
// https://www.apollographql.com/docs/tutorial/local-state/
// https://www.apollographql.com/docs/tutorial/local-state/
cache.writeData({
  data: {
    cartOpen: true,
    openChats: [],
  },
});

export default cache;
