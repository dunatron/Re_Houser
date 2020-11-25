import { useMemo } from 'react';
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';
import { concatPagination } from '@apollo/client/utilities';
import { getMainDefinition } from '@apollo/client/utilities';
import merge from 'deepmerge';
import createInMemoryCache from './store/createInMemoryCache';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient;

const websocketEndpoint = process.env.WS_ENDPOINT;
const authUri = process.env.ENDPOINT;

function createApolloClient() {
  // const logLink = new ApolloLink((operation, forward) => {
  //   return forward(operation).map(data => {
  //     console.log('logging', data);
  //     return forward(operation);
  //   });
  // });
  const headersLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }) => ({
      headers: {
        // authorization: Auth.userId(), // however you get your token
        ...headers,
      },
    }));
    return forward(operation);
  });
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
    // logLink,
    headersLink,
    createUploadLink({
      uri: authUri,
      fetchOptions: {
        credentials: 'include',
      },
      // pass the headers along from this request. This enables SSR with logged in state
      // headers,
    }),
  ]);
  const wsLink = process.browser
    ? new WebSocketLink({
        uri: websocketEndpoint,
        options: {
          reconnect: true,
          timeout: 30000,
          // connectionParams: {
          //   headers: {
          //     Authorization: "Bearer yourauthtoken",
          //   },
          // },
        },
      })
    : null;

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
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    // link: new HttpLink({
    //   uri: authUri, // Server URL (must be absolute)
    //   credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    // }),
    link: link,
    // link: withHeaders.concat(authLink),
    cache: createInMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache);

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
