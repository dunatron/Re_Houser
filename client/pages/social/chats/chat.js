import React, { Component } from 'react';
import ChatRoomScreen from '../../../components/ChatRoomScreen';
import PleaseSignIn from '../../../components/PleaseSignIn';

const MyLeasePage = props => {
  const {
    appData: { currentUser },
  } = props;
  return (
    <div>
      <PleaseSignIn
        currentUser={currentUser}
        message="You cannot view a lease without being signed in">
        <ChatRoomScreen chatId={props.query.chatId} me={props.me} />
      </PleaseSignIn>
    </div>
  );
};

export default MyLeasePage;
