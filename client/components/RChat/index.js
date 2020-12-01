import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { GiftedChat, IMessage, User, Bubble } from 'react-native-gifted-chat';
import { View, Dimensions } from 'react-native';
import { Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useCurrentHeight from '@/Lib/hooks/useCurrentHeight';

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const getChatImageUrl = (chat, user) => {
  const member = chat.participants.find(p => p.id === user.id);
  if (member && member.profilePhoto) return member.profilePhoto.url;
  return '/images/person-icon.png';
};

const RChat = props => {
  const theme = useTheme();
  const { chat, me, onSendMessage, handleFetchMore } = props;
  const height = useCurrentHeight();

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
  // const height = '390px';
  const bottomOffset = 80;

  const renderBubble = props => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: theme.palette.secondary.main,
          maxWidth: '212px',
        },
        right: {
          backgroundColor: theme.palette.primary.main,
          maxWidth: '212px',
        },
      }}
      // textProps={{
      //   style: {
      //     // color: props.position === 'left' ? '#fff' : '#000',
      //     color: theme.palette.text.primary,
      //   },
      // }}
      textStyle={{
        left: {
          color: theme.palette.secondary.contrastText,
        },
        right: {
          color: theme.palette.primary.contrastText,
        },
      }}
      // style={styles.container}
    />
  );
  // const height = '190px';
  return (
    <View
      style={{
        width,
        height: `${height - 120}px`,
        backgroundColor: theme.palette.background.paper,
      }}>
      <GiftedChat
        renderBubble={renderBubble}
        style={{
          backgroundColor: theme.palette.background.paper,
        }}
        textInputStyle={{
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.background.paper,
        }}
        infiniteScroll={true}
        loadEarlier={true} // use this to as true if we have more messages
        onLoadEarlier={handleFetchMore}
        scrollToBottom={true}
        scrollToBottomComponent={() => (
          <View>
            <ArrowDownwardIcon color="secondary" />
          </View>
        )}
        {...{ messages, onSend, user, inverted, bottomOffset }}
      />
    </View>
  );
};

RChat.propTypes = {
  chat: PropTypes.any,
  me: PropTypes.shape({
    firstName: PropTypes.any,
    id: PropTypes.any,
    lastNaem: PropTypes.any,
  }).isRequired,
  messages: PropTypes.any,
  onSendMessage: PropTypes.func.isRequired,
};

export default RChat;
