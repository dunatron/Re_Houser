// import withApollo from 'next-with-apollo';
// import { getDataFromTree } from '@apollo/react-ssr';
// // import { ApolloClient } from 'apollo-client';
// // import { ApolloLink } from 'apollo-client-preset';
// import { ApolloClient, split, ApolloLink } from '@apollo/client';
// import { getMainDefinition } from '@apollo/client/utilities';
// // import { ApolloLink, split } from 'apollo-link';
// import { WebSocketLink } from 'apollo-link-ws';
// // import { getMainDefinition } from 'apollo-utilities';
// import { createUploadLink } from 'apollo-upload-client';
// import { endpoint, prodEndpoint, wsEndpoint, wsProdEndpoint } from '../config';
// // store
// import cache from './store/cache';
// import resolvers from './store/resolvers';

// function createClient({ headers, cookies }) {
//   console.log('AHh createClient headers => ', headers);
//   console.log('AHh createClient cookies => ', cookies);
//   const authLink = new ApolloLink((operation, forward) => {
//     operation.setContext({
//       fetchOptions: {
//         credentials: 'include',
//       },
//       headers: headers,
//     });
//     return forward(operation);
//   });

//   /**
//    * ToDo: Setup new apollo client properly with ssr https://github.com/apollographql/apollo-client/issues/5808
//    */

//   /**
//    * ToDo: implement process.env for ws
//    */
//   const websocketEndpoint =
//     process.env.NODE_ENV === 'development' ? wsEndpoint : wsProdEndpoint;
//   const authURI =
//     process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint;
//   console.group('ENDPOINTS');
//   console.log('websocketEndpoint => ', websocketEndpoint);
//   console.log('authURI endpoint => ', authURI);
//   console.groupEnd();
//   const wsLink = process.browser
//     ? new WebSocketLink({
//         // if you instantiate in the server, the error will be thrown
//         // uri: `ws://localhost:4444`,
//         uri: websocketEndpoint,
//         options: {
//           reconnect: true,
//         },
//       })
//     : null;

//   const authLinkWithUpload = authLink.concat(
//     createUploadLink({
//       uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
//     })
//   );

//   const link = process.browser
//     ? split(
//         //only create the split in the browser
//         // split based on operation type
//         ({ query }) => {
//           const { kind, operation } = getMainDefinition(query);
//           return kind === 'OperationDefinition' && operation === 'subscription';
//         },
//         wsLink,
//         authLinkWithUpload
//         // authLink.concat(
//         //   createUploadLink({
//         //     uri:
//         //       process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
//         //   })
//         // )
//       )
//     : authLinkWithUpload;

//   const client = new ApolloClient({
//     // ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
//     // Endpoint deploy
//     credentials: 'include', // fix for iphone cookies? https://github.com/apollographql/apollo-client/issues/4190
//     uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
//     link: link,
//     cache: cache,
//     assumeImmutableResults: true, // new
//     resolvers: resolvers(),
//   });
//   return client;
// }

// export default withApollo(createClient, { getDataFromTree });

import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/link-error';
import { getDataFromTree } from '@apollo/react-ssr';
import { createUploadLink } from 'apollo-upload-client';
import withApollo from 'next-with-apollo';
// import { WebSocketLink } from 'apollo-link-ws';
// pcage name for websockets have changed, currently no docs on how to integrate it, aloso package is in beta and not finished
// including this 3.0 clien which is still beta
// commenting out subscriptions for now
import { WebSocketLink } from '@apollo/link-ws';

import CacheWrapper from './store/cache';
import { endpoint, prodEndpoint, wsEndpoint, wsProdEndpoint } from '../config';

function createClient({ headers, initialState }) {
  const websocketEndpoint =
    process.env.NODE_ENV === 'development' ? wsEndpoint : wsProdEndpoint;
  // const wsLink = new WebSocketLink({
  //   uri: `ws://localhost:5000/`,
  //   options: {
  //     reconnect: true,
  //   },
  // });
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
  return new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        if (networkError)
          console.log(
            `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
          );
      }),
      // this uses apollo-link-http under the hood, so all the options here come from that package
      createUploadLink({
        uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
        fetchOptions: {
          credentials: 'include',
        },
        // pass the headers along from this request. This enables SSR with logged in state
        headers,
      }),
    ]),
    cache: CacheWrapper({ initialState }),

    // cache: new InMemoryCache({
    //   typePolicies: {
    //     Query: {
    //       fields: {
    //         allItems: paginationField(),
    //       },
    //     },
    //   },
    // }).restore(initialState || {}),
  });
}

export default withApollo(createClient, { getDataFromTree });
