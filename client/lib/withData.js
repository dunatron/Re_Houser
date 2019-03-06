import withApollo from "next-with-apollo"
import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
// import { ApolloLink } from "apollo-client-preset"
import { ApolloLink } from "apollo-link"
import { createUploadLink } from "apollo-upload-client"
import { endpoint, prodEndpoint } from "../config"

function createClient({ headers }) {
  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      fetchOptions: {
        credentials: "include",
      },
      headers: headers,
    })
    return forward(operation)
  })

  const client = new ApolloClient({
    // ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
    link: authLink.concat(
      createUploadLink({
        uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
      })
    ),
    cache: new InMemoryCache(),
  })
  return client
}

export default withApollo(createClient)
