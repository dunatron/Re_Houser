import React, { useState } from 'react';
import { GiftedChat, IMessage, User } from 'react-native-gifted-chat';
import { View, Dimensions } from 'react-native';

const App = () => {
  const [messages, setMessages] = useState([
    {
      _id: 123,
      text:
        'This is a test of Gifted Chat for the WEB 🎉 \n https://github.com/FaridSafi/react-native-gifted-chat ',
      user: {
        _id: 2,
        name: 'you',
        avatar: '/me.jpg',
      },
      createdAt: new Date(),
    },
    {
      _id: 456,
      text:
        'Find source code here: \n https://github.com/xcarpentier/gifted-chat-web-demo',
      user: {
        _id: 2,
        name: 'you',
        avatar: '/me.jpg',
      },
      createdAt: new Date(),
    },
  ]);
  const onSend = () => setMessages([...messages, ...newMsg]);
  const user = { _id: 1, name: 'me' };
  const inverted = false;
  const { width, height } = Dimensions.get('window');
  return (
    <View style={{ width, height }}>
      <GiftedChat {...{ messages, onSend, user, inverted }} />
    </View>
  );
};

export default App;
