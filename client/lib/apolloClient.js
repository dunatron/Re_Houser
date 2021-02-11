import { useMemo } from 'react';
import nookies from 'nookies';
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
import { getMainDefinition } from '@apollo/client/utilities';
import createInMemoryCache from './store/createInMemoryCache';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';
import merge from 'deepmerge';

// subscription docs
// https://github.com/apollographql/subscriptions-transport-ws
// https://github.com/apollographql/subscriptions-transport-ws/blob/master/PROTOCOL.md

// next js with apollo custom example
// https://www.apollographql.com/blog/building-a-next-js-app-with-apollo-client-slash-graphql/

// modern sub errors
// https://github.com/vercel/next.js/issues/10902

// possible issue to caching dedupe
// https://medium.com/@martinseanhunt/how-to-invalidate-cached-data-in-apollo-and-handle-updating-paginated-queries-379e4b9e4698

// some tips and tricks with apollo cahce
// https://medium.com/rbi-tech/tips-and-tricks-for-working-with-apollo-cache-3b5a757f10a0

// next js examples
// https://github.com/vercel/next.js/tree/canary/examples
// https://github.com/vercel/next.js/blob/canary/examples/with-apollo-and-redux/lib/apollo.js
// https://github.com/vercel/next.js/blob/canary/examples/with-apollo/lib/apolloClient.js

// apollo client cache 3
//

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient;

const websocketEndpoint = process.env.WS_ENDPOINT;
const authUri = process.env.ENDPOINT;

const isServer = typeof window === 'undefined';

// can sometimes be empty entirely but will be an object from nextContext
function createApolloClient(ctx) {
  // get cookies set by nextJs
  const cookies = ctx ? nookies.get(ctx) : nookies.get();

  // set these cookies from next into variables
  const token = cookies.token ? cookies.token : '';
  const refreshToken = cookies['refresh-token'] ? cookies['refresh-token'] : '';

  // set the cookies from nextJs into our Apollo link via setContext
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        // 'Access-Control-Allow-Origin': 'https://yoga.rehouser.co.nz',
        'Access-Control-Allow-Origin': '*',
        cookie: `token=${token}; refresh-token=${refreshToken};`,
      },
    };
  });

  const uploadHttpLink = createUploadLink({
    uri: authUri,
    fetchOptions: {
      credentials: 'include', // this makes sure we include things like cookies
      headers: {
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Origin': 'http://naaaa.com',
      },
    },
  });

  const linksToApollo = from([
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
    authLink,
    uploadHttpLink,
  ]);

  const client = process.browser
    ? new SubscriptionClient(websocketEndpoint, {
        reconnect: true,
        timeout: 30000,
      })
    : null;
  const wsLink = process.browser ? new WebSocketLink(client) : null;

  //   const wsLink = process.browser
  //     ? new WebSocketLink({
  //         lazy: true,
  //         uri: websocketEndpoint,
  //         options: {
  //           reconnect: true,
  //           timeout: 30000,
  //         },
  //       })
  //     : null;

  const link = process.browser
    ? split(
        // split based on operation type
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query);
          return kind === 'OperationDefinition' && operation === 'subscription';
        },
        wsLink,
        linksToApollo
      )
    : linksToApollo;
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: link,
    cache: createInMemoryCache(),
  });
}

const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;

const combineMerge = (target, source, options) => {
  const destination = target.slice();

  source.forEach((item, index) => {
    if (typeof destination[index] === 'undefined') {
      destination[index] = options.cloneUnlessOtherwiseSpecified(item, options);
    } else if (options.isMergeableObject(item)) {
      destination[index] = merge(target[index], item, options);
    } else if (target.indexOf(item) === -1) {
      destination.push(item);
    }
  });
  return destination;
};

export function initializeApollo(initialState = null, nextJsContext) {
  const _apolloClient =
    apolloClient ?? createApolloClient(nextJsContext ? nextJsContext : {});
  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // merge initialState(from getServerSideProps) with existing clientSide cache
    const data = merge(initialState, existingCache, {
      arrayMerge: combineMerge, // default was concating list __refs
    });
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
