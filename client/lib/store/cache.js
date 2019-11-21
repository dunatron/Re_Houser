// import { InMemoryCache } from 'apollo-cache-inmemory';
import { InMemoryCache } from '@apollo/client';
import { offsetLimitPaginatedField } from '../offsetLimitPaginatedField';
const mergeBasicBitch = (existing, incoming, props) => {
  // return [...(existing || []), ...incoming];
  return existing;
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
          // merge: mergeBasicBitch(),
          // read(existing, {args})
        },
        openChats: {
          keyArgs: false,
        },
        me: {
          keyArgs: false,
          // read(existing, { args }) {
          //   console.log('Existing me read => ', existing);
          //   if (!existing) return null;
          //   return existing;
          // },
          merge(existing, incoming, { args }) {
            // const merged = existsing ? existing.slice(0) : [];
            // console.log('Merge some data incoming => ', existing);
            // console.log('Merge some data exisiting => ', existing);
            // console.log('Merge some data args => ', args);
            return incoming;
            return existing;
          },
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
        // chat: {
        //   read(exisiting, { args, toReference }) {
        //     return (
        //       exisiting ||
        //       toReference({
        //         __typename: 'Chat',
        //         isbn: args.isbn,
        //       })
        //     );
        //   },
        // },
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
