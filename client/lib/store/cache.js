// import { InMemoryCache } from 'apollo-cache-inmemory';
import { InMemoryCache } from '@apollo/client/cache';
import gql from 'graphql-tag';
import {
  offsetLimitPaginatedField,
  connectionPaginationField,
} from '../offsetLimitPaginatedField';
const mergeBasicBitch = (existing, incoming, { args }) => {
  return [...(existing || []), ...incoming];
};
const cache = new InMemoryCache({
  // freezeResults: true, // new
  freezeResults: true, // having this as true breaks material table as they mutate results. Having this as true is a must for apollo cache
  // at least in the was of writing the cache mutations. can turn off for production...
  // With Apollo 3.0 we handle much much more here. Which is good
  // reads are working but merges are not...
  typePolicies: {
    Query: {
      fields: {
        //chats should be paginated
        // chats: offsetLimitPaginatedField(),
        chats: {
          keyArgs: false,
          merge(existing, reference, other) {
            console.log('existing me => ', existing);
            console.log('reference me => ', reference);
            console.log('other me => ', other);
            return reference;
          },
          // read(existsing, { args }) {
          //   console.log('Trying to read existing chats');
          //   return (
          //     existsing && existing.slice(args.offset, args.offset + args.limit)
          //   );
          // },
        },
        ownerProperties: {
          keyArgs: false,
          keyFields: false,
          merge(existing, reference, other) {
            console.log('existing me => ', existing);
            console.log('reference me => ', reference);
            console.log('other me => ', other);
            return reference;
          },
          // read(existsing, { args }) {
          //   console.log('Trying to read existing properties');
          //   console.log('the args => ', args);
          //   return [];
          //   return (
          //     existsing && existing.slice(args.offset, args.offset + args.limit)
          //   );
          // },
        },
        me: {
          keyArgs: false,
          keyFields: false,
          merge(existing, reference, other) {
            console.log('existing me => ', existing);
            console.log('reference me => ', reference);
            console.log('other me => ', other);
            return reference;
          },
        },
      },
    },
  },
});

// we need better local Data SERIOUSLY CHECK OUT VIRTUAL FIELDS.
// https://www.apollographql.com/docs/tutorial/local-state/
// https://www.apollographql.com/docs/tutorial/local-state/
// cache.writeData({
//   data: {
//     cartOpen: true,
//     openChats: [],
//   },
// });

cache.writeQuery({
  query: gql`
    {
      openChats
    }
  `,
  data: {
    openChats: [],
  },
});

export default cache;
