import Router from 'next/router';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';

const Container = styled(Toolbar)`
  padding: 0;
  display: flex;
  flex-direction: row;
  background-color: rebeccapurple;
  color: rebeccapurple;
`;

const BackButton = styled(Button)`
  svg {
    color: rebeccapurple;
  }
`;

const Rest = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const Picture = styled.img`
  height: 40px;
  width: 40px;
  margin-top: 3px;
  margin-left: -22px;
  object-fit: cover;
  padding: 5px;
  border-radius: 50%;
`;

const Name = styled.div`
  line-height: 56px;
`;

const DeleteButton = styled(Button)`
  color: rebeccapurple;
`;

const ChatNavbar = ({ chat }) => {
  const handleRemoveChat = useCallback(() => {
    // removeChat().then(() => {
    //   history.replace('/chats');
    // });
  }, []);

  const navBack = () => {
    Router.back();
  };

  return (
    <Container>
      <BackButton data-testid="back-button" onClick={navBack}>
        <ArrowBackIcon />
      </BackButton>
      {chat && chat.picture && chat.name && (
        <React.Fragment>
          <Picture data-testid="chat-picture" src={chat.picture} />
          <Name data-testid="chat-name">{chat.name}</Name>
        </React.Fragment>
      )}
      <Rest>
        <DeleteButton data-testid="delete-button" onClick={handleRemoveChat}>
          <DeleteIcon />
        </DeleteButton>
      </Rest>
    </Container>
  );
};

export default ChatNavbar;
