import withApollo from 'next-with-apollo';
// import { ApolloClient } from 'apollo-client';
// import { ApolloLink } from 'apollo-client-preset';
import {
  ApolloClient,
  split,
  ApolloLink,
  getMainDefinition,
} from '@apollo/client';
// import { ApolloLink, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
// import { getMainDefinition } from 'apollo-utilities';
import { createUploadLink } from 'apollo-upload-client';
import { endpoint, prodEndpoint, wsEndpoint, wsProdEndpoint } from '../config';
// store
import cache from './store/cache';
import resolvers from './store/resolvers';

function createClient({ headers, cookies }) {
  console.log('AHh createClient headers => ', headers);
  console.log('AHh createClient cookies => ', cookies);
  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      fetchOptions: {
        credentials: 'include',
      },
      headers: headers,
    });
    return forward(operation);
  });

  /**
   * ToDo: implement process.env for ws
   */
  const websocketEndpoint =
    process.env.NODE_ENV === 'development' ? wsEndpoint : wsProdEndpoint;
  const authURI =
    process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint;
  console.group('ENDPOINTS');
  console.log('websocketEndpoint => ', websocketEndpoint);
  console.log('authURI endpoint => ', authURI);
  console.groupEnd();
  const wsLink = process.browser
    ? new WebSocketLink({
        // if you instantiate in the server, the error will be thrown
        // uri: `ws://localhost:4444`,
        uri: websocketEndpoint,
        options: {
          reconnect: true,
        },
      })
    : null;

  const authLinkWithUpload = authLink.concat(
    createUploadLink({
      uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
    })
  );

  const link = process.browser
    ? split(
        //only create the split in the browser
        // split based on operation type
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query);
          return kind === 'OperationDefinition' && operation === 'subscription';
        },
        wsLink,
        authLinkWithUpload
        // authLink.concat(
        //   createUploadLink({
        //     uri:
        //       process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
        //   })
        // )
      )
    : authLinkWithUpload;

  const client = new ApolloClient({
    // ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    // Endpoint deploy
    credentials: 'include', // fix for iphone cookies? https://github.com/apollographql/apollo-client/issues/4190
    uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
    link: link,
    cache: cache,
    assumeImmutableResults: true, // new
    resolvers: resolvers(),
  });
  return client;
}

export default withApollo(createClient);
