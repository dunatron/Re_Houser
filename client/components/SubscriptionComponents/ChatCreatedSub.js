import { useState } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { MESSAGE_CREATED_SUBSCRIPTION } from '../../graphql/subscriptions/MessageCreatedSub';

const OPEN_CHAT_LOCAL_MUTATION = gql`
  mutation OPEN_CHAT_LOCAL_MUTATION($id: Int!) {
    openChat(id: $id) @client
  }
`;

const ChatCreatedSub = ({ me }) => {
  const [openChat] = useMutation(OPEN_CHAT_LOCAL_MUTATION);
  // Subscribe to al new messages where user is a participant
  // useSubscription(MESSAGE_CREATED_SUBSCRIPTION, {
  //   variables: {
  //     where: {
  //       mutation_in: 'CREATED',
  //       node: {
  //         chat: {
  //           participants_some: {
  //             id: me.id,
  //           },
  //         },
  //       },
  //     },
  //   },
  //   onSubscriptionData: ({ client, subscriptionData }) => {
  //     // open this chat in the local ApolloState
  //     const {
  //       data: {
  //         messageSub: { mutation, node, updatedFields, previouseValues },
  //       },
  //     } = subscriptionData;

  //     // we shpuld do diff things depending on if we were sender or not...
  //     if(node.sender.id === me.id) return 

  //     // if previouseValues and updatedFields are null this is a new message
  //     if (previouseValues === null && updatedFields === null) {
  //       // this is a brand new message
  //     }
  //     if (mutation === 'CREATED') {
  //       // this is a brand new message
  //     }
  //     if (mutation === 'UPDATED') {
  //       // a message was updated
  //     }
  //     if (mutation === 'DELETE') {
  //       // message was deleted
  //     }
  //     openChat({
  //       variables: { id: node.chat.id },
  //     });
  //     // update Messages not seen
  //     toast(
  //       <div>
  //         <h1>New Message</h1>
  //         <p>message content</p>
  //       </div>
  //     );
  //   },
  // });
  // return null;
};

export default ChatCreatedSub;
