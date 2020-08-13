import React, { useState } from 'react';
import { GiftedChat, IMessage, User } from 'react-native-gifted-chat';
import { View, Dimensions } from 'react-native';

const RChat = () => {
  const [messages, setMessages] = useState([
    {
      _id: 123,
      text: 'Now do I need a horn',
      user: {
        _id: 2,
        name: 'you',
        avatar: '/me.jpg',
      },
      createdAt: new Date(),
    },
    {
      _id: 456,
      text: 'Here is another cool message',
      user: {
        _id: 2,
        name: 'you',
        avatar: '/me.jpg',
      },
      createdAt: new Date(),
    },
  ]);
  const onSend = newMsg => setMessages([...messages, ...newMsg]);
  const user = { _id: 1, name: 'me' };
  const inverted = false;
  const { width, height } = Dimensions.get('window');
  return (
    <View style={{ width, height }}>
      <GiftedChat {...{ messages, onSend, user, inverted }} />
    </View>
  );
};

export default RChat;
