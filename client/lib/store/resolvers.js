import gql from "graphql-tag"
 
const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`

const resolvers = () => {
  return {
    Mutation: {
      toggleCart(_, variables, { cache }) {
        // read the cartOpen value from the cache
        const { cartOpen } = cache.readQuery({
          query: LOCAL_STATE_QUERY,
        })
        // Write the cart State to the opposite
        const data = {
          data: { cartOpen: !cartOpen },
        }
        cache.writeData(data)
        return data
      },
    },
  }
}

export default resolvers
