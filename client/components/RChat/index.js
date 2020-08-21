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

  // const messages = props.messages.map((msg, idx) => ({
  //   _id: msg.id,
  //   text: msg.content,
  //   user: {
  //     _id: msg.sender.id,
  //     name: `${msg.sender.firstName} ${msg.sender.lastName}`,
  //     avatar: getChatImageUrl(chat, msg.sender),
  //   },
  //   createdAt: new Date(msg.createdAt),
  // }));

  const onSend = newMsg => {
    console.log('New message => ', newMsg);
    // its actually an array so you would have to forEach them
    onSendMessage(newMsg[0].text);
    // alert(newMsg);
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

export default RChat;
