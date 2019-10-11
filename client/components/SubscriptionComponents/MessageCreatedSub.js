import { useState } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import { MESSAGE_CREATED_SUBSCRIPTION } from '../../graphql/subscriptions/MessageCreatedSub';
import { writeMessage } from '../../services/cache.service';
import { toast } from 'react-toastify';
import gql from 'graphql-tag';

const OPEN_CHAT_LOCAL_MUTATION = gql`
  mutation OPEN_CHAT_LOCAL_MUTATION($id: Int!) {
    openChat(id: $id) @client
  }
`;

const MessageCreatedSub = ({ me }) => {
  const [openChat] = useMutation(OPEN_CHAT_LOCAL_MUTATION);
  // Subscribe to al new messages where user is a participant
  useSubscription(MESSAGE_CREATED_SUBSCRIPTION, {
    variables: {
      where: {
        // mutation_in: 'CREATED', // listen for CREATED, UPDATED, DELETED
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
      // open this chat in the local ApolloState
      const {
        data: {
          messageSub: { mutation, node, updatedFields, previouseValues },
        },
      } = subscriptionData;
      console.log("AHH The node => ", node)
      console.log("AHH The mutation => ", mutation)
     
      // we were the sender do nothing with this sub
      if (me.id === node.sender.id) {
        return;
      }
      // write message to cache service
      // if previouseValues and updatedFields are null this is a new message
      if (previouseValues === null && updatedFields === null) {
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
      openChat({
        variables: { id: node.chat.id },
      });
      // update Messages not seen
      toast(
        <div>
          <h4>Message: {node.sender.firstName} {node.sender.lastName}</h4>
          <p>{node.content}</p>
        </div>
      );
    },
  });
  return null;
};

export default MessageCreatedSub;
