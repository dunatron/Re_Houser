import { useMemo } from 'react';
import nookies from 'nookies';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
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
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';

// subscription docs
// https://github.com/apollographql/subscriptions-transport-ws
// https://github.com/apollographql/subscriptions-transport-ws/blob/master/PROTOCOL.md

// next js with apollo custom example
// https://www.apollographql.com/blog/building-a-next-js-app-with-apollo-client-slash-graphql/

// modern sub errors
// https://github.com/vercel/next.js/issues/10902

// possible issue to caching dedupe
// https://medium.com/@martinseanhunt/how-to-invalidate-cached-data-in-apollo-and-handle-updating-paginated-queries-379e4b9e4698

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
        cookie: `token=${token}; refresh-token=${refreshToken};`,
      },
    };
  });

  const uploadHttpLink = createUploadLink({
    uri: authUri,
    fetchOptions: {
      credentials: 'include', // this makes sure we include things like cookies
    },
    // headers: {
    //   // ...(req?.headers && req.headers),
    //   cookie: `token=${
    //     cookies['token'] ? cookies['token'] : ''
    //   }; refresh-token=${
    //     cookies['refresh-token'] ? cookies['refresh-token'] : ''
    //   };`,
    // },
  });

  // const uploadWithHeaders = headersLink.concat(uploadHttpLink);

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
    // uploadWithHeaders,
  ]);

  const client = process.browser
    ? new SubscriptionClient(websocketEndpoint, {
        reconnect: true,
        // dont add connextion params. we should generate JWT token with prisma on BE and connect with that
        // connectionParams: {
        //   // headers: {
        //   Authorization: token ? `Bearer ${token}` : '',
        //   // }
        // },
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
  const store = useMemo(() => initializeApollo(state, null), [state]);
  return store;
}
