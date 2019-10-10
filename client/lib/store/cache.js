import { InMemoryCache } from 'apollo-cache-inmemory';
const cache = new InMemoryCache({
  // freezeResults: true, // new
  freezeResults: true, // having this as true breaks material table as they mutate results. Having this as true is a must for apollo cache
  // at least in the was of writing the cache mutations. can turn off for production...
});

cache.writeData({
  data: {
    cartOpen: true,
    openChats: [],
  },
});

export default cache;
