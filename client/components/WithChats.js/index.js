import React, { Fragment } from 'react';
import { useQuery, useSubscription, useMutation } from '@apollo/react-hooks';
import { CURRENT_USER_QUERY } from '../User/index';
import {
  MY_CHATS_QUERY,
  MESSAGES_CONNECTION_QUERY,
} from '../../graphql/queries';
import { MESSAGE_CREATED_SUBSCRIPTION } from '../../graphql/subscriptions/MessageCreatedSub';
import Loader from '../Loader';
import MessageCreatedSub from '../SubscriptionComponents/MessageCreatedSub';

import gql from 'graphql-tag';

const OPEN_CHAT_LOCAL_MUTATION = gql`
  mutation OPEN_CHAT_LOCAL_MUTATION($id: Int!) {
    openChat(id: $id) @client
  }
`;

const LoadChats = ({ me }) => {
  const chatsQuery = useQuery(MY_CHATS_QUERY, {
    variables: {
      first: 1,
      where: {
        participants_some: {
          id_in: me.id,
        },
      },
    },
  });
  // time to stop and make chatsConnection a thing. we need it for aggregate
  const { data, loading, error, fetchMore } = chatsQuery;
  // place data into
  if (data) {
    if (data.chatsConnection.pageInfo.hasNextPage === true) {
      fetchMore({
        variables: {
          query: MY_CHATS_QUERY,
          cursor: data.chatsConnection.pageInfo.endCursor,
          skip: data.chatsConnection.edges.length,
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          const newEdges = fetchMoreResult.chatsConnection.edges;
          const pageInfo = fetchMoreResult.chatsConnection.pageInfo;
          return newEdges.length
            ? {
                chatsConnection: {
                  ...fetchMoreResult.chatsConnection,
                  __typename: prevResult.chatsConnection.__typename,
                  edges: [...newEdges, ...prevResult.chatsConnection.edges],
                  pageInfo,
                },
              }
            : prevResult;
        },
      });
    }
  }
  console.log('LoadChats: loading => ', loading);
  console.log('LoadChats: error => ', error);
  console.log('LoadChats: data => ', data);

  const [openChat] = useMutation(OPEN_CHAT_LOCAL_MUTATION);

  // ALso lets do the subscription to all chats with us involved
  useSubscription(MESSAGE_CREATED_SUBSCRIPTION, {
    variables: {
      where: {
        mutation_in: 'CREATED',
      },
    },
    onSubscriptionData: ({ client, subscriptionData }) => {
      // 1. pop open a chat in apollo local store with the chat info and load up
      openChat({
        variables: { id: subscriptionData.data.messageSub.node.chat.id },
      });
      console.log('subscriptionData => ', subscriptionData);
      // simply push this into local openChats
      // if (!subscriptionData.data) return null;
      // const message = {
      //   cursor: 'sdfsdfsdf',
      //   node: {
      //     ...subscriptionData.data.messageSub.node,
      //   },
      //   __typename: 'MessageEdge',
      // };
      // console.log('MESSAGE FROM THE SUB => ', message);
      // first of all we need to read the chats
      // client.writeQuery({
      //   query: MESSAGES_CONNECTION_QUERY,
      //   variables: {
      //     orderBy: 'createdAt_DESC',
      //     first: 5,
      //     skip: 0,
      //     where: {
      //       chat: {
      //         id: subscriptionData.data.messageSub.node.chat.id
      //       },
      //     },
      //   },
      //   data: {
      //     messagesConnection: {
      //       ...data.messagesConnection,
      //       edges: data.messagesConnection.edges.concat(message),
      //       // edges: [],
      //     },
      //   },
      // });
      // https://www.apollographql.com/docs/react/advanced/caching.html#direct
    },
    // ... rest options
  });

  return null;
};

const WithChats = props => {
  const me = props.me ? props.me : null;
  if (me === null) return props.children;
  // all with chats has to do is put them into the store.
  return (
    <Fragment>
      <LoadChats me={me} />
      <MessageCreatedSub me={me} />
      {props.children}
    </Fragment>
  );
  // I think we dont need to do this. just return normal children and load chats into store
};

export default WithChats;
