// import { ApolloClient, ApolloLink, InMemoryCache, split } from '@apollo/client';
// // import { onError } from '@apollo/link-error';
// import { onError } from '@apollo/client/link/error';

// import { getDataFromTree } from '@apollo/react-ssr';
// import { createUploadLink } from 'apollo-upload-client';
// import withApollo from 'next-with-apollo';
// import { getMainDefinition } from '@apollo/client/utilities';
// // pcage name for websockets have changed, currently no docs on how to integrate it, aloso package is in beta and not finished
// // including this 3.0 clien which is still beta. But this is pretty good setup for now
// // commenting out subscriptions for now
// import { WebSocketLink } from '@apollo/client/link/ws';

// import CacheWrapper from './store/cache';
// // import { endpoint, prodEndpoint, wsEndpoint, wsProdEndpoint } from '../config';

// // const wsLink = new WebSocketLink({
// //   uri: `ws://localhost:5000/`,
// //   options: {
// //     reconnect: true,
// //   },
// // });

// function createClient(props) {
//   const { headers, initialState } = props;
//   console.log('Create client props => ', props);
//   // const websocketEndpoint =
//   //   process.env.NODE_ENV === 'development' ? wsEndpoint : wsProdEndpoint;
//   // const authUri =
//   //   process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint;

//   console.log('__APOLLO__INITIAL_STATE__ => ', initialState);

//   const websocketEndpoint = process.env.WS_ENDPOINT;
//   const authUri = process.env.ENDPOINT;

//   // create our apollo authLink
//   const authLink = ApolloLink.from([
//     onError(({ graphQLErrors, networkError }) => {
//       if (graphQLErrors)
//         graphQLErrors.forEach(({ message, locations, path }) =>
//           console.log(
//             `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//           )
//         );
//       if (networkError)
//         console.log(
//           `[Network error]: ${networkError}. Are you sure the server is running? We cannot hit the backend`
//         );
//     }),
//     // this uses apollo-link-http under the hood, so all the options here come from that package
//     // the server is meant to be attaching token and refresh-token to the headers as cookies on login
//     // the me query is meant to get the user data based on the header request having userId
//     createUploadLink({
//       uri: authUri,
//       fetchOptions: {
//         credentials: 'include',
//       },
//       // pass the headers along from this request. This enables SSR with logged in state
//       headers,
//     }),
//   ]);

//   // create our websocket link. if you instantiate in the server, the error will be thrown
//   const wsLink = process.browser
//     ? new WebSocketLink({
//         uri: websocketEndpoint,
//         options: {
//           reconnect: true,
//           timeout: 30000,
//           // connectionParams: {
//           //   headers,
//           // },
//           // connectionParams: {
//           //   headers: {
//           //     Authorization: "Bearer yourauthtoken",
//           //   },
//           // },
//         },
//       })
//     : null;

//   // based on the operation we will use our authLink or wsLink, only create the split in the browser
//   const link = process.browser
//     ? split(
//         // split based on operation type
//         ({ query }) => {
//           const { kind, operation } = getMainDefinition(query);
//           return kind === 'OperationDefinition' && operation === 'subscription';
//         },
//         wsLink,
//         authLink
//       )
//     : authLink;

//   console.log('Our link is => ', link);

//   // return the Apollo client to pass to nexts withApollo
//   return new ApolloClient({
//     ssrMode: typeof window === 'undefined', // set to true for SSR
//     link: link,
//     cache: CacheWrapper({ initialState }),
//   });
// }

// export default withApollo(createClient, { getDataFromTree });

// import { ApolloClient, ApolloLink, InMemoryCache, split } from '@apollo/client';
// import { onError } from '@apollo/link-error';
// import { getDataFromTree } from '@apollo/client/react/ssr';
// import { createUploadLink } from 'apollo-upload-client';
// import withApollo from 'next-with-apollo';
// import { WebSocketLink } from '@apollo/client/link/ws';
// import { getMainDefinition } from '@apollo/client/utilities';
// // import paginationField from './store/paginationField';

// function createClient({ headers, initialState }) {
//   console.log('HEADERS ON THE CREATE CLIENT: ', headers);
//   const endpoint = process.env.ENDPOINT;

//   const websocketEndpoint = process.env.WS_ENDPOINT;
//   const authUri = process.env.ENDPOINT;

//   const authLink = ApolloLink.from([
//     onError(({ graphQLErrors, networkError }) => {
//       if (graphQLErrors)
//         graphQLErrors.forEach(({ message, locations, path }) =>
//           console.log(
//             `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//           )
//         );
//       if (networkError)
//         console.log(
//           `[Network error]: ${networkError}. Are you sure the server is running? We cannot hit the backend`
//         );
//     }),
//     // this uses apollo-link-http under the hood, so all the options here come from that package
//     // the server is meant to be attaching token and refresh-token to the headers as cookies on login
//     // the me query is meant to get the user data based on the header request having userId
//     createUploadLink({
//       uri: authUri,
//       fetchOptions: {
//         credentials: 'include',
//       },
//       // pass the headers along from this request. This enables SSR with logged in state
//       headers,
//     }),
//   ]);

//   // create our websocket link. if you instantiate in the server, the error will be thrown
//   const wsLink = process.browser
//     ? new WebSocketLink({
//         uri: websocketEndpoint,
//         // options: {
//         //   reconnect: true,
//         //   timeout: 30000,
//         //   // connectionParams: {
//         //   //   headers,
//         //   // },
//         //   // connectionParams: {
//         //   //   headers: {
//         //   //     Authorization: "Bearer yourauthtoken",
//         //   //   },
//         //   // },
//         // },
//       })
//     : null;

//   const link = process.browser
//     ? split(
//         // split based on operation type
//         ({ query }) => {
//           const { kind, operation } = getMainDefinition(query);
//           return kind === 'OperationDefinition' && operation === 'subscription';
//         },
//         wsLink,
//         authLink
//       )
//     : authLink;

//   return new ApolloClient({
//     ssrMode: typeof window === 'undefined', // set to true for SSR
//     link: ApolloLink.from([
//       onError(({ graphQLErrors, networkError }) => {
//         if (graphQLErrors)
//           graphQLErrors.forEach(({ message, locations, path }) =>
//             console.log(
//               `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//             )
//           );
//         if (networkError)
//           console.log(
//             `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
//           );
//       }),
//       // link,
//       // this uses apollo-link-http under the hood, so all the options here come from that package
//       createUploadLink({
//         uri: endpoint,
//         fetchOptions: {
//           credentials: 'include',
//         },
//         // pass the headers along from this request. This enables SSR with logged in state
//         headers,
//       }),
//     ]),
//     cache: new InMemoryCache({
//       freezeResults: true,
//       typePolicies: {
//         // Query: {
//         //   fields: {
//         //     allItems: paginationField(),
//         //   },
//         // },
//         Query: {
//           fields: {
//             // ownerProperties: relayStylePagination(),
//             // ownerProperties: offsetLimitPagination(),
//             // ownerProperties: paginationField(),
//             ownerProperties: {
//               merge(existing = [], incoming) {
//                 return [...existing, ...incoming];
//               },
//             },
//           },
//         },
//         User: {
//           fields: {
//             isAdmin: {
//               read: (exisiting, toolBag) => {
//                 const permissions = toolBag.readField('permissions');
//                 if (!permissions) return false;
//                 return permissions.includes('ADMIN');
//               },
//             },
//             isWizard: {
//               read: (exisiting, toolBag) => {
//                 const permissions = toolBag.readField('permissions');
//                 if (!permissions) return false;
//                 return permissions.includes('WIZARD');
//               },
//             },
//           },
//         },
//       },
//     }).restore(initialState || {}),
//   });
// }

// export default withApollo(createClient, { getDataFromTree });

import { ApolloClient, ApolloLink, InMemoryCache, split } from '@apollo/client';
import { onError } from '@apollo/link-error';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { createUploadLink } from 'apollo-upload-client';
import withApollo from 'next-with-apollo';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
// import paginationField from './store/paginationField';

import nookies from 'nookies';

function createClient(ctx) {
  // console.log('ctx on create client => ', ctx);
  const { headers, initialState } = ctx;
  console.log('HEADERS ON THE CREATE CLIENT: ', headers);

  const websocketEndpoint = process.env.WS_ENDPOINT;
  const authUri = process.env.ENDPOINT;

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
      credentials: 'include',
      // headers: {
      //   ...(headers?.cookie && {
      //     cookie: headers?.cookie,
      //   }),
      // },
      // // headers: {
      // //   cookie: headers?.cookies,
      // // },
      fetchOptions: {
        credentials: 'include',
        // credentials: 'same-origin',
      },
      // pass the headers along from this request. This enables SSR with logged in state
      // headers,
      headers: {
        ...headers,
        'tron-test': 'hmmmm',
        'Access-Control-Allow-Origin': 'https://app.rehouser.co.nz',
      },
    }),
  ]);

  // create our websocket link. if you instantiate in the server, the error will be thrown
  const wsLink = process.browser
    ? new WebSocketLink({
        uri: websocketEndpoint,
        options: {
          reconnect: true,
          timeout: 30000,
          connectionParams: {
            headers,
          },
          // connectionParams: {
          //   headers: {
          //     Authorization: "Bearer yourauthtoken",
          //   },
          // },
        },
      })
    : null;

  const splitLink = process.browser
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

  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // set to true for SSR
    link: splitLink,
    cache: new InMemoryCache({
      freezeResults: true,
      typePolicies: {
        Query: {
          fields: {
            ownerProperties: {
              merge(existing = [], incoming) {
                return [...existing, ...incoming];
              },
            },
          },
        },
        User: {
          fields: {
            isAdmin: {
              read: (exisiting, toolBag) => {
                const permissions = toolBag.readField('permissions');
                if (!permissions) return false;
                return permissions.includes('ADMIN');
              },
            },
            isWizard: {
              read: (exisiting, toolBag) => {
                const permissions = toolBag.readField('permissions');
                if (!permissions) return false;
                return permissions.includes('WIZARD');
              },
            },
          },
        },
      },
    }).restore(initialState || {}),
  });
}

export default withApollo(createClient, { getDataFromTree });
