import React from 'react';
import ChatsNavbar from './ChatsNavbar';
import ChatsList from './ChatsList';
import styled from 'styled-components';
// import { History } from 'history';
// import AddChatButton from './AddChatButton';

const Container = styled.div`
  height: 100vh;
`;

const ChatsListScreen = props => (
  <Container>
    <ChatsNavbar {...props} />
    <ChatsList {...props} />
    {/* <AddChatButton history={history} /> */}
  </Container>
);

export default ChatsListScreen;