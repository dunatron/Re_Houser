import { InMemoryCache } from "apollo-cache-inmemory"
const cache = new InMemoryCache()

cache.writeData({
  data: {
    cartOpen: true,
  },
})

export default cache
