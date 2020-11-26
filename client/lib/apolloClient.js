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

// can sometimes be empty entirely but will be an object from nextContext
function createApolloClient({ req }) {
  // ahh are these an array or object

  // console.log('nextHeaders => ', nextHeaders);

  // const headersLink = setContext((_, { headers }) => {
  //   return {
  //     headers: {
  //       ...(headers && headers),
  //       ...(req?.headers && req.headers),
  //     },
  //   };
  // });

  // const authMiddleware = new ApolloLink((operation, forward) => {
  //   operation.setContext((request, previousContext) => {
  //     return {
  //       headers: {
  //         //   ...headers,
  //         //   ...(req?.headers && req.headers),
  //         ...(req?.headers && req.headers),
  //         tron: 'Populate Metatron in the headers',
  //       },
  //     };
  //   });

  //   return forward(operation);
  // });

  const uploadHttpLink = createUploadLink({
    uri: authUri,
    fetchOptions: {
      credentials: 'include', // this makes sure we include things like cookies
    },
    headers: {
      // ...(req?.headers && req.headers),
    },
  });

  // const uploadWithHeaders = headersLink.concat(uploadHttpLink);

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
    // authMiddleware,
    uploadHttpLink,
    // uploadWithHeaders,
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

export function initializeApollo(initialState = null, nextJsContext) {
  const _apolloClient =
    apolloClient ?? createApolloClient(nextJsContext ? nextJsContext : {});

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
    // console.log('Log the extract => ', client.cache.extract());
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
