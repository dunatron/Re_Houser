import React from 'react';
import moment from 'moment';
import { List, ListItem } from '@material-ui/core';
import styled from 'styled-components';
import { useCallback } from 'react';
import Router from 'next/router';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Error from '../ErrorMessage';

const Container = styled.div`
  height: calc(100% - 56px);
  overflow-y: overlay;
`;

const StyledList = styled(List)`
  padding: 0 !important;
`;

const StyledListItem = styled(ListItem)`
  height: 76px;
  padding: 0 15px;
  display: flex;
`;

const ChatPicture = styled.img`
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 50%;
`;

const ChatInfo = styled.div`
  width: calc(100% - 60px);
  height: 46px;
  padding: 15px 0;
  margin-left: 10px;
  border-bottom: 0.5px solid silver;
  position: relative;
`;

const ChatName = styled.div`
  margin-top: 5px;
`;

const MessageContent = styled.div`
  color: gray;
  font-size: 15px;
  margin-top: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const MessageDate = styled.div`
  position: absolute;
  color: gray;
  top: 20px;
  right: 0;
  font-size: 13px;
`;

export const MY_CHATS_QUERY = gql`
  query MY_CHATS_QUERY(
    $where: ChatWhereInput
    $orderBy: ChatOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    chats(
      where: $where
      orderBy: $orderBy
      skip: $skip
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      id
      name
      lastMessage {
        id
        isMine
      }
      participants {
        id
      }
    }
  }
`;

export const CREATE_CHAT_MUTATION = gql`
  mutation CREATE_CHAT_MUTATION($data: ChatCreateInput!) {
    createChat(data: $data) {
      id
      name
      lastMessage {
        id
        isMine
      }
      participants {
        id
      }
    }
  }
`;

const ChatsList: React.FC = props => {
  console.log('Chat props => ', props);
  const { data } = useQuery<any>(MY_CHATS_QUERY, {
    variables: {
      where: {
        participants_some: {
          id_in: props.me.id,
        },
      },
    },
  });
  const [createChat, createChatProps] = useMutation(CREATE_CHAT_MUTATION, {
    variables: {
      data: {
        name: 'CHat room 0',
        participants: {
          connect: [
            {
              id: props.me.id,
            },
          ],
        },
      },
    },
  });

  const navToChat = chat => {
    Router.push({
      pathname: '/chat',
      query: {
        chatId: chat.id,
      },
    });
  };
  console.log('chats data => ', data);
  if (data === undefined || data.chats === undefined) {
    return null;
  }
  let chats = data.chats;
  console.log('chats => ', chats);

  return (
    <Container>
      <StyledList>
        <Error error={createChatProps.error} />
        {chats.length === 0 && 'No CHats'}
        <button onClick={() => createChat()}></button>
        {chats.map((chat: any) => (
          <StyledListItem
            key={chat.id}
            data-testid="chat"
            button
            // onClick={navToChat.bind(null, chat)}
            onClick={() => navToChat(chat)}>
            <ChatPicture
              data-testid="picture"
              src={chat.picture}
              alt="Profile"
            />
            <ChatInfo>
              <ChatName data-testid="name">{chat.name}</ChatName>
              {chat.lastMessage && (
                <React.Fragment>
                  <MessageContent data-testid="content">
                    {chat.lastMessage.content}
                  </MessageContent>
                  <MessageDate data-testid="date">
                    {moment(chat.lastMessage.createdAt).format('HH:mm')}
                  </MessageDate>
                </React.Fragment>
              )}
            </ChatInfo>
          </StyledListItem>
        ))}
      </StyledList>
    </Container>
  );
};

export default ChatsList;
