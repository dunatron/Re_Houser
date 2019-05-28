import withApollo from "next-with-apollo"
import { ApolloClient } from "apollo-client"
// import { ApolloLink } from "apollo-client-preset"
import { ApolloLink, split } from "apollo-link"
import { WebSocketLink } from "apollo-link-ws"
import { getMainDefinition } from "apollo-utilities"
import { createUploadLink } from "apollo-upload-client"
import { endpoint, prodEndpoint } from "../config"
import { HttpLink } from "apollo-link-http"
import {
  SubscriptionClient,
  addGraphQLSubscriptions,
} from "subscriptions-transport-ws"
// store
import cache from "./store/cache"
import resolvers from "./store/resolvers"

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

  // Create a WebSocket link:
  // const wsLink = new WebSocketLink(
  //   {
  //     uri: `wss://us1.prisma.sh/heath-dunlop-37e897/rehouser-service/dev?headers={"Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NTkwNDIwNzksIm5iZiI6MTU1OTA0MjA3OSwiZXhwIjoxNTU5MTI4NDc5fQ.6iFzp5O4uP81rFWDKq47M82QN_ysUvGsxuH6QKi8daI"}`,
  //     options: {
  //       reconnect: true,
  //     },
  //   }
  // )

  const wsLink = process.browser
    ? new WebSocketLink({
        // if you instantiate in the server, the error will be thrown
        uri: `ws://localhost:4000/subscriptions`,
        options: {
          reconnect: true,
        },
      })
    : null

  const httplink = new HttpLink({
    uri: "http://localhost:3000/graphql",
    credentials: "same-origin",
  })

  const authLinkWithUpload = authLink.concat(
    createUploadLink({
      uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
    })
  )

  const link = process.browser
    ? split(
        //only create the split in the browser
        // split based on operation type
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query)
          return kind === "OperationDefinition" && operation === "subscription"
        },
        wsLink,
        authLink.concat(
          createUploadLink({
            uri:
              process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
          })
        )
      )
    : authLinkWithUpload

  const client = new ApolloClient({
    // ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    // Endpoint deploy
    uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
    link: link,
    // local dat
    cache: cache,
    resolvers: resolvers(),
  })
  return client
}

export default withApollo(createClient)
