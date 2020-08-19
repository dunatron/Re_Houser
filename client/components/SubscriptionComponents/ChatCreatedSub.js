import { useState, useContext } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { CHAT_SUBSCRIPTION } from '../../graphql/subscriptions/ChatSub';
import { store } from '../../store';

const ChatCreatedSub = ({ me }) => {
  const { state, dispatch } = useContext(store);
  useSubscription(CHAT_SUBSCRIPTION, {
    variables: {
      where: {
        node: {
          participants_some: [
            {
              id: me.id,
            },
          ],
        },
      },
    },
    onSubscriptionData: ({ client, subscriptionData }) => {
      const {
        data: {
          chatSub: { mutation, node, updatedFields, previousValues },
        },
      } = subscriptionData;

      if (previousValues === null && updatedFields === null) {
      }
      if (mutation === 'CREATED') {
        dispatch({
          type: 'openChat',
          payload: subscriptionData.data.chatSub.node.chat,
        });
        toast(
          <div>
            <h4>Message: New Chat created</h4>
          </div>
        );
      }
      if (mutation === 'UPDATED') {
        // a chat was updated
      }
      if (mutation === 'DELETE') {
        // chat was deleted
      }
    },
  });
  return null;
};

export default ChatCreatedSub;
