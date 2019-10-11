import { InMemoryCache } from 'apollo-cache-inmemory';
const cache = new InMemoryCache({
  // freezeResults: true, // new
  freezeResults: true, // having this as true breaks material table as they mutate results. Having this as true is a must for apollo cache
  // at least in the was of writing the cache mutations. can turn off for production...
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
