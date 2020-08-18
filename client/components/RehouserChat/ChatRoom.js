import { useQuery } from '@apollo/client';
import { CHAT_QUERY } from '../../graphql/queries';

import Loader from '../Loader';
import RChat from '../RChat';

const ChatRoom = () => {
  return (
    <div>
      <RChat />
    </div>
  );
};

/**
 *
 * @param {*} props
 */
const ChatRoomScreenConnection = props => {
  const { chatId } = props;
  const { data, loading, error } = useQuery(CHAT_QUERY, {
    variables: {
      where: {
        id: chatId,
      },
    },
  });

  

  console.log('ChatRoomScreenConnection data => ', data);
  if (loading) return <Loader loading={loading} />;
  if (error) return <Error error={error} />;
  // ToDo create a pagination provider for this
  return <ChatRoom {...props} chat={data.chat} />;
};

export default ChatRoomScreenConnection;

/**
 * Think about how this should actually work. i.e a really nice architecture for all of this\
 * - when chat bar is closed
 */
