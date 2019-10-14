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
