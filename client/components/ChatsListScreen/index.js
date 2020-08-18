import React from 'react';
import ChatsNavbar from './ChatsNavbar';
import ChatsList from './ChatsList';
import styled from 'styled-components';

const Container = styled.div`
  // height: 100vh;
`;

const ChatsListScreen = props => (
  <Container>
    <ChatsNavbar {...props} />
    <ChatsList {...props} />
  </Container>
);

export default ChatsListScreen;
