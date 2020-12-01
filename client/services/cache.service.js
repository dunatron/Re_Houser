// // import { DataProxy } from 'apollo-cache';
// import { DataProxy } from '@apollo/client/cache';

// // NOTE: the below has changed since the upgrade defaultDataIdFromObject no longer used and this
// // whole section will need to be redone really
// // import { defaultDataIdFromObject } from 'apollo-cache-inmemory';
// // import { ApolloClient } from '@apollo/client';

// import gql from 'graphql-tag';
// // import {
// //   ApolloClient,
// //   useApolloClient,
// //   useQuery,
// //   useMutation,
// //   useSubscription,
// // } from '@apollo/react-hooks';

// import {
//   useApolloClient,
//   useQuery,
//   useMutation,
//   useSubscription,
// } from '@apollo/client';

// import {
//   CHAT_QUERY,
//   MESSAGES_QUERY,
//   MESSAGES_CONNECTION_QUERY,
// } from '../graphql/queries/index';

// import {
//   MESSAGES_CONNECTION_ORDER_BY,
//   MESSAGES_CONNECTION_FIRST,
//   MESSAGES_CONNECTION_SKIP,
// } from '../lib/const';

// import * as fragments from '../graphql/fragments';
// import * as queries from '../graphql/queries';

// const OPEN_CHAT_LOCAL_MUTATION = gql`
//   mutation OPEN_CHAT_LOCAL_MUTATION($id: Int!) {
//     openChat(id: $id) @client
//   }
// `;

// export const writeMessage = async (client, message) => {
//   // console.group('writeMessage cache service');
//   // console.log('message => ', message);
//   // console.log('client => ', client);
//   // return;

//   // Might be better to write a writeOwnMessage
//   // first figure out why its doing this though...

//   if (!client.query) {
//     // do write for InDbCahce
//     if (client.readQuery) {
//       // const cahcedData = await client.readQuery({
//       //   query: MESSAGES_CONNECTION_QUERY,
//       //   variables: variables,
//       // });
//       // console.log("cahcedData => ", cahcedData)
//     }
//     return;
//   }

//   // if(client.__proto__ === 'ApolloCache') {
//   //   alert("AN in memory cahce yea?")
//   // }
//   // return

//   // message connection variables
//   const variables = {
//     orderBy: MESSAGES_CONNECTION_ORDER_BY,
//     first: MESSAGES_CONNECTION_FIRST,
//     skip: MESSAGES_CONNECTION_SKIP,
//     where: {
//       chat: {
//         id: message.chat.id,
//       },
//     },
//   };

//   // message connection messages
//   const { data, loading, error } = await client.query({
//     query: MESSAGES_CONNECTION_QUERY,
//     variables: variables,
//   });

//   // new message to write
//   const pagedMesssage = {
//     cursor: message.id,
//     node: {
//       ...message,
//     },
//     __typename: 'MessageEdge',
//   };

//   // write the query to the cache
//   client.writeQuery({
//     query: MESSAGES_CONNECTION_QUERY,
//     variables: variables,
//     data: {
//       messagesConnection: {
//         ...data.messagesConnection,
//         edges: [pagedMesssage, ...data.messagesConnection.edges],
//         // edges: data.messagesConnection.edges.concat(pagedMesssage),
//       },
//     },
//   });
// };

// export const writeChat = (client, chat) => {};

// import { DataProxy } from 'apollo-cache';
import { DataProxy } from '@apollo/client/cache';

// NOTE: the below has changed since the upgrade defaultDataIdFromObject no longer used and this
// whole section will need to be redone really
// import { defaultDataIdFromObject } from 'apollo-cache-inmemory';
// import { ApolloClient } from '@apollo/client';

import gql from 'graphql-tag';
// import {
//   ApolloClient,
//   useApolloClient,
//   useQuery,
//   useMutation,
//   useSubscription,
// } from '@apollo/react-hooks';

import {
  useApolloClient,
  useQuery,
  useMutation,
  useSubscription,
} from '@apollo/client';

import {
  CHAT_QUERY,
  MESSAGES_QUERY,
  MESSAGES_CONNECTION_QUERY,
} from '../graphql/queries/index';

import {
  MESSAGES_CONNECTION_ORDER_BY,
  MESSAGES_CONNECTION_FIRST,
  MESSAGES_CONNECTION_SKIP,
} from '../lib/const';

import * as fragments from '../graphql/fragments';
import * as queries from '../graphql/queries';

const OPEN_CHAT_LOCAL_MUTATION = gql`
  mutation OPEN_CHAT_LOCAL_MUTATION($id: Int!) {
    openChat(id: $id) @client
  }
`;

export const writeMessage = async (client, message, optimisticId) => {
  // console.group('writeMessage cache service');
  // console.log('message => ', message);
  // console.log('client => ', client);
  // return;

  // Might be better to write a writeOwnMessage
  // first figure out why its doing this though...

  if (!client.query) {
    // do write for InDbCahce
    if (client.readQuery) {
      // const cahcedData = await client.readQuery({
      //   query: MESSAGES_CONNECTION_QUERY,
      //   variables: variables,
      // });
      // console.log("cahcedData => ", cahcedData)
    }
    return;
  }

  // if(client.__proto__ === 'ApolloCache') {
  //   alert("AN in memory cahce yea?")
  // }
  // return

  // message connection variables
  const variables = {
    orderBy: MESSAGES_CONNECTION_ORDER_BY,
    first: MESSAGES_CONNECTION_FIRST,
    skip: MESSAGES_CONNECTION_SKIP,
    where: {
      chat: {
        id: message.chat.id,
      },
    },
  };

  // message connection messages
  const { data, loading, error } = await client.query({
    query: MESSAGES_CONNECTION_QUERY,
    variables: variables,
  });

  // new message to write
  const pagedMesssage = {
    cursor: message.id,
    node: {
      ...message,
    },
    __typename: 'MessageEdge',
  };

  const filteredMessages = data.messagesConnection.edges.filter((edge, idx) => {
    if (optimisticId !== message.id) {
      if (edge.cursor === optimisticId) return;
    }
    return edge;
  });

  // we assumes it is the actual message and remove the optimistic message
  if (optimisticId !== message.id) {
  }
  // write the query to the cache
  client.writeQuery({
    query: MESSAGES_CONNECTION_QUERY,
    variables: variables,
    data: {
      messagesConnection: {
        ...data.messagesConnection,
        // edges: [pagedMesssage, ...data.messagesConnection.edges],
        edges: [pagedMesssage, ...filteredMessages],
        // edges: data.messagesConnection.edges.concat(pagedMesssage),
      },
    },
  });
};

export const writeChat = (client, chat) => {};
