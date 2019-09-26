import React, { Component } from 'react';
import ChatRoomScreen from '../components/ChatRoomScreen';
import PleaseSignIn from '../components/PleaseSignIn';

const MyLeasePage = props => (
  <div>
    <PleaseSignIn message="You cannot view a lease without being signed in">
      <ChatRoomScreen chatId={props.query.chatId} />
    </PleaseSignIn>
  </div>
);

export default MyLeasePage;
