import { ApolloClient, ApolloLink, InMemoryCache, split } from '@apollo/client';
import { onError } from '@apollo/link-error';
import { getDataFromTree } from '@apollo/react-ssr';
import { createUploadLink } from 'apollo-upload-client';
import withApollo from 'next-with-apollo';
import { getMainDefinition } from '@apollo/client/utilities';
// import { WebSocketLink } from 'apollo-link-ws';
// pcage name for websockets have changed, currently no docs on how to integrate it, aloso package is in beta and not finished
// including this 3.0 clien which is still beta. But this is pretty good setup for now
// commenting out subscriptions for now
import { WebSocketLink } from '@apollo/link-ws';

import CacheWrapper from './store/cache';
// import { endpoint, prodEndpoint, wsEndpoint, wsProdEndpoint } from '../config';

function createClient({ headers, initialState }) {
  // const websocketEndpoint =
  //   process.env.NODE_ENV === 'development' ? wsEndpoint : wsProdEndpoint;
  // const authUri =
  //   process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint;

  const websocketEndpoint = process.env.WS_ENDPOINT;
  const authUri = process.env.ENDPOINT;

  // create our apollo authLink
  const authLink = ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError)
        console.log(
          `[Network error]: ${networkError}. Are you sure the server is running? We cannot hit the backend`
        );
    }),
    // this uses apollo-link-http under the hood, so all the options here come from that package
    // the server is meant to be attaching token and refresh-token to the headers as cookies on login
    // the me query is meant to get the user data based on the header request having userId
    createUploadLink({
      uri: authUri,
      fetchOptions: {
        credentials: 'include',
      },
      // pass the headers along from this request. This enables SSR with logged in state
      headers,
    }),
  ]);

  // create our websocket link. if you instantiate in the server, the error will be thrown
  const wsLink = process.browser
    ? new WebSocketLink({
        uri: websocketEndpoint,
        options: {
          reconnect: true,
          // connectionParams: {
          //   authToken: user.authToken,
          // },
        },
      })
    : null;

  // based on the operation we will use our authLink or wsLink, only create the split in the browser
  const link = process.browser
    ? split(
        // split based on operation type
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query);
          return kind === 'OperationDefinition' && operation === 'subscription';
        },
        wsLink,
        authLink
      )
    : authLink;

  // return the Apollo client to pass to nexts withApollo
  return new ApolloClient({
    link: link,
    cache: CacheWrapper({ initialState }),
  });
}

export default withApollo(createClient, { getDataFromTree });
