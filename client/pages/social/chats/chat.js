import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ChatRoomScreen from '../../../components/ChatRoomScreen';
import PleaseSignIn from '../../../components/PleaseSignIn';

const SocialSingleChatPage = ({
  appData: { currentUser },
  query: { chatId },
}) => {
  const me = currentUser.data ? currentUser.data.me : null;
  return (
    <div>
      <PleaseSignIn
        currentUser={currentUser}
        message="You cannot view a lease without being signed in">
        <ChatRoomScreen chatId={chatId} me={me} />
      </PleaseSignIn>
    </div>
  );
};

SocialSingleChatPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
  query: PropTypes.shape({
    chatId: PropTypes.string.isRequired,
  }),
};

export default SocialSingleChatPage;
