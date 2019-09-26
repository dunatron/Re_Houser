import gql from 'graphql-tag';
import React from 'react';
import { useCallback } from 'react';
import { useApolloClient, useQuery, useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import ChatNavbar from './ChatNavbar';
import MessageInput from './MessageInput';
import MessagesList from './MessagesList';
import Error from '../ErrorMessage';

const Container = styled.div`
  background: url(/assets/chat-background.jpg);
  display: flex;
  flex-flow: column;
  /* height: 100vh; */
  /* position: absolute;
  top: 0; */
`;

export const CHAT_QUERY = gql`
  query CHAT_QUERY($where: ChatWhereUniqueInput!) {
    chat(where: $where) {
      id
      messages {
        id
        createdAt
        content
      }
    }
  }
`;

export const CREATE_MESSAGE_MUTATION = gql`
  mutation CREATE_MESSAGE_MUTATION($data: MessageCreateInput!) {
    createMessage(data: $data) {
      id
    }
  }
`;

const ChatRoomScreen = ({ chat, chatId }) => {
  const client = useApolloClient();

  const [sendMessage, sendMessageProps] = useMutation(CREATE_MESSAGE_MUTATION, {
    variables: {
      data: {
        content: 'test',
        isMine: true,
        lastMessageRel: {
          connect: {
            id: chatId,
          },
        },
        chat: {
          connect: {
            id: chatId,
          },
        },
      },
    },
  });

  const onSendMessage = useCallback(
    (content: string) => {
      if (!chat) return null;
      console.log('Our conmtent => ', content);

      sendMessage();

      const message = {
        id: (chat.messages.length + 10).toString(),
        createdAt: new Date(),
        content,
        __typename: 'Chat',
      };

      client.writeQuery({
        query: CHAT_QUERY,
        variables: {
          where: {
            id: chatId,
          },
        },
        data: {
          chat: {
            ...chat,
            messages: chat.messages.concat(message),
          },
        },
      });
    },
    [chat, chatId, client]
  );

  if (!chat) return null;
  console.log('Show me that chat => ', chat);
  return (
    <Container>
      <ChatNavbar chat={chat} />
      {chat.messages && <MessagesList messages={chat.messages} />}
      <MessageInput onSendMessage={onSendMessage} />
    </Container>
  );
};

const ChatRoomScreenConnection = props => {
  const { chatId } = props;
  const { data, loading, error } = useQuery(CHAT_QUERY, {
    variables: {
      where: {
        id: chatId,
      },
    },
  });
  if (loading) return 'Loaiding';
  if (error) return <Error error={error} />;
  console.log('data.chat => ', data.chat);
  return (
    <div>
      {chatId}
      <ChatRoomScreen {...props} chat={data.chat} />
    </div>
  );
};

export default ChatRoomScreenConnection;

// const getChatQuery = gql`
//   query GetChat($chatId: ID!) {
//     chat(chatId: $chatId) {
//       id
//       name
//       picture
//       messages {
//         id
//         content
//         createdAt
//       }
//     }
//   }
// `;

// interface ChatRoomScreenParams {
//   chatId: string;
//   history: History;
// }

// export interface ChatQueryMessage {
//   id: string;
//   content: string;
//   createdAt: Date;
// }

// export interface ChatQueryResult {
//   id: string;
//   name: string;
//   picture: string;
//   messages: Array<ChatQueryMessage>;
// }

// type OptionalChatQueryResult = ChatQueryResult | null;

// const ChatRoomScreen: React.FC<ChatRoomScreenParams> = ({
//   history,
//   chatId,
// }) => {
//   const client = useApolloClient();
//   const {
//     data: { chat },
//   } = useQuery<any>(getChatQuery, {
//     variables: { chatId },
//   });

// const onSendMessage = useCallback(
//   (content: string) => {
//     if (!chat) return null;

//     const message = {
//       id: (chat.messages.length + 10).toString(),
//       createdAt: new Date(),
//       content,
//       __typename: 'Chat',
//     };

//     client.writeQuery({
//       query: getChatQuery,
//       variables: { chatId },
//       data: {
//         chat: {
//           ...chat,
//           messages: chat.messages.concat(message),
//         },
//       },
//     });
//   },
//   [chat, chatId, client]
// );

//   if (!chat) return null;

//   return <div>Hiii</div>;

//   return (
//     <Container>
//       {/* <ChatNavbar chat={chat} history={history} /> */}
//       {chat.messages && <MessagesList messages={chat.messages} />}
//       <MessageInput onSendMessage={onSendMessage} />
//     </Container>
//   );
// };

// export default ChatRoomScreen;
