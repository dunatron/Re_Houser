import { useState, useContext } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { OPEN_CHAT_LOCAL_MUTATION } from '../../lib/store/resolvers';
import { MESSAGE_CREATED_SUBSCRIPTION } from '../../graphql/subscriptions/MessageCreatedSub';
import { writeMessage } from '../../services/cache.service';
import { toast } from 'react-toastify';
import gql from 'graphql-tag';
import { store } from '../../store';

const MessageCreatedSub = ({ me }) => {
  const { state, dispatch } = useContext(store);
  useSubscription(MESSAGE_CREATED_SUBSCRIPTION, {
    variables: {
      where: {
        node: {
          chat: {
            participants_some: {
              id: me.id,
            },
          },
        },
      },
    },
    onSubscriptionData: ({ client, subscriptionData }) => {
      alert('Message Created SUb Does this too');
      const {
        data: {
          messageSub: { mutation, node, updatedFields, previousValues },
        },
      } = subscriptionData;

      // we were the sender do nothing with this sub
      if (me.id === node.sender.id) {
        return;
      }
      // write message to cache service
      // if previouseValues and updatedFields are null this is a new message
      if (previousValues === null && updatedFields === null) {
        // this is a brand new message
      }
      if (mutation === 'CREATED') {
        // this is a brand new message
        writeMessage(client, node);
      }
      if (mutation === 'UPDATED') {
        // a message was updated
      }
      if (mutation === 'DELETE') {
        // message was deleted
      }
      dispatch({
        type: 'openChat',
        payload: subscriptionData.data.messageSub.node.chat,
      });
      toast(
        <div>
          <h4>
            Message: {node.sender.firstName} {node.sender.lastName}
          </h4>
          <p>{node.content}</p>
        </div>
      );
    },
  });
  return null;
};

export default MessageCreatedSub;
