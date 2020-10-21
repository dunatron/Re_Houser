import { useState, useContext } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { OPEN_CHAT_LOCAL_MUTATION } from '@/Lib/store/resolvers';
import { MESSAGE_CREATED_SUBSCRIPTION } from '@/Gql/subscriptions/MessageCreatedSub';
import { writeMessage } from '../../services/cache.service';
import { toast } from 'react-toastify';
import gql from 'graphql-tag';
import { store } from '@/Store/index';
import Error from '@/Components/ErrorMessage'
import Loader from '@/Components/Loader'

const MessageCreatedSub = ({ me }) => {
  const { state, dispatch } = useContext(store);
  const { loading, data, error } = useSubscription(MESSAGE_CREATED_SUBSCRIPTION, {
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
      // toast(
      //   <div>
      //     <h4>
      //       Message: {node.sender.firstName} {node.sender.lastName}
      //     </h4>
      //     <p>{node.content}</p>
      //   </div>
      // );
    },
  });
  if (loading) return null;
  if (error) {
    return <div>Not SUbScribed To: MESSAGE_CREATED_SUBSCRIPTION
      <Error  error={error}/>
    </div>
  }
  
  return null;
};

export default MessageCreatedSub;
