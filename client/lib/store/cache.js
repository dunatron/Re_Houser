import { InMemoryCache } from "apollo-cache-inmemory"
const cache = new InMemoryCache({
  freezeResults: true, // new
})

cache.writeData({
  data: {
    cartOpen: true,
  },
})

export default cache
