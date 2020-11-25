import { useMemo } from 'react';
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  HttpLink,
  InMemoryCache,
  split,
  from,
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

function getToken() {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJyZWhvdXNlci1jdG8taWQiLCJ1c2VyUGVybWlzc2lvbnMiOlsiQURNSU4iLCJVU0VSIiwiUEVSTUlTU0lPTlVQREFURSIsIldJWkFSRCJdLCJpYXQiOjE2MDYzMzgzODF9.IeVMBQ7XEMgZsWb4XgBnISyhcw-JtQV74MUTc2Hvv4E';
}

function createApolloClient({ headers }) {
  const authMiddleware = new ApolloLink((operation, forward) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sadnesss', 'all round');
    }

    operation.setContext((request, previousContext) => {
      //   console.log('setContext request => ', request);
      //   console.log('setContext previousContext => ', previousContext);
      return {
        headers: {
          ...headers,
          tron: 'TRON PASSES A HEADER ON EVERY REQUEST',
        },
      };
    });

    return forward(operation);
  });

  const uploadHttpLink = createUploadLink({
    uri: authUri,
    fetchOptions: {
      // credentials: 'include',
      credentials: 'same-origin',
    },
  });

  const authLink = from([
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
    authMiddleware,
    uploadHttpLink,
  ]);
  const wsLink = process.browser
    ? new WebSocketLink({
        uri: websocketEndpoint,
        options: {
          reconnect: true,
          timeout: 30000,
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
    link: link,
    cache: createInMemoryCache(),
  });
}

export function initializeApollo(initialState = null, headers) {
  const _apolloClient = apolloClient ?? createApolloClient({ headers });

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
  //   if (pageProps?.props) {
  //     // console.log('Log the extract => ', client.cache.extract());
  //     pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  //   }

  if (pageProps.props) {
    // console.log('Log the extract => ', client.cache.extract());
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps) {
  console.log('AHH THE PAGE props?? => ', pageProps);
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
