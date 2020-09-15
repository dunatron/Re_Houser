import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { GiftedChat, IMessage, User } from 'react-native-gifted-chat';
import { View, Dimensions } from 'react-native';

const getChatImageUrl = (chat, user) => {
  const member = chat.participants.find(p => p.id === user.id);
  if (member && member.profilePhoto) return member.profilePhoto.url;
  return '/images/person-icon.png';
};

const RChat = props => {
  const { chat, me, onSendMessage } = props;

  const messageSet = Array.from(new Set(props.messages)); // removes duplicates

  const messages = messageSet.map((msg, idx) => ({
    _id: msg.id,
    text: msg.content,
    user: {
      _id: msg.sender.id,
      name: `${msg.sender.firstName} ${msg.sender.lastName}`,
      avatar: getChatImageUrl(chat, msg.sender),
    },
    createdAt: new Date(msg.createdAt),
  }));

  const onSend = newMsg => {
    onSendMessage(newMsg[0].text);
  };
  // const user = { _id: 1, name: 'me' };
  const user = { _id: me.id, name: `${me.firstName} ${me.lastNaem}` };
  const inverted = true;
  const width = '280px';
  const height = '390px';
  return (
    <View style={{ width, height }}>
      <GiftedChat {...{ messages, onSend, user, inverted }} />
    </View>
  );
};

RChat.propTypes = {
  chat: PropTypes.any.isRequired,
  me: PropTypes.shape({
    firstName: PropTypes.any,
    id: PropTypes.any,
    lastNaem: PropTypes.any,
  }).isRequired,
  messages: PropTypes.any.isRequired,
  onSendMessage: PropTypes.func.isRequired,
};

export default RChat;
