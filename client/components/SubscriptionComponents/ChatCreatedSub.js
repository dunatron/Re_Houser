import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useSubscription } from '@apollo/client';
import { CHAT_SUBSCRIPTION } from '@/Gql/subscriptions/ChatSub';
import { store } from '@/Store/index';
import { toast } from 'react-toastify';

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

      // if (previousValues === null && updatedFields === null) {
      // }
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
      // if (mutation === 'UPDATED') {
      //   console.log('Catch chat updates');
      // }
      // if (mutation === 'DELETE') {
      //   console.log('Catch when a chat gets deleted');
      // }
    },
  });
  return null;
};

ChatCreatedSub.propTypes = {
  me: PropTypes.shape({
    id: PropTypes.any,
  }).isRequired,
};

export default ChatCreatedSub;
