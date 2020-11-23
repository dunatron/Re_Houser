import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useSubscription } from '@apollo/client';
import { CHAT_SUBSCRIPTION } from '@/Gql/subscriptions/ChatSub';
import { store } from '@/Store/index';
import { toast } from 'react-toastify';
import Error from '@/Components/ErrorMessage';
import Loader from '@/Components/Loader';

const ChatCreatedSub = ({ userId }) => {
  const { state, dispatch } = useContext(store);
  const { loading, data, error } = useSubscription(CHAT_SUBSCRIPTION, {
    variables: {
      where: {
        node: {
          participants_some: {
            id: userId,
          },
        },
      },
    },
    onSubscriptionData: ({ client, subscriptionData }) => {
      const {
        data: {
          chatSub: { mutation, node, updatedFields, previousValues },
        },
      } = subscriptionData;
      if (mutation === 'CREATED') {
        dispatch({
          type: 'openChat',
          payload: subscriptionData.data.chatSub.node,
        });
        toast(
          <div>
            <h4>Message: New Chat created</h4>
          </div>
        );
      }
    },
  });

  if (loading) return null;
  if (error) {
    return (
      <div>
        Not SUbScribed To: CHAT_SUBSCRIPTION
        <Error error={error} />
      </div>
    );
  }

  // they are just aledrts find the best way to return nothing

  return null;
};

ChatCreatedSub.propTypes = {
  userId: PropTypes.string.isRequired,
};

const MemoizedChatCreatedSub = React.memo(ChatCreatedSub);

export default MemoizedChatCreatedSub;
