import PropTypes from "prop-types";
import React from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';

const Container = styled.div`
  position: relative;
  display: block;
  flex: 2;
  overflow-y: overlay;
  padding: 0 15px;
  padding-bottom: 70px; 
`;

const LoadingMore = styled.div`
  height: 30px;
  line-height: 30px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
`;

const MessageItem = styled.div`
  display: inline-block;
  position: relative;
  max-width: 100%;
  border-radius: 7px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  margin-top: 10px;
  margin-bottom: 10px;
  clear: both;
  &::after {
    content: '';
    display: table;
    clear: both;
  }
  &::before {
    content: '';
    position: absolute;
    bottom: 3px;
    width: 12px;
    height: 19px;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: contain;
  }
  ${props =>
    props.isMine
      ? css`
          float: right;
          background-color: #dcf8c6;
          &::before {
            right: -11px;
            background-image: url(/assets/message-mine.png);
          }
        `
      : css`
          float: left;
          background-color: #fff;
          &::before {
            left: -11px;
            background-image: url(/assets/message-other.png);
          }
        `}
`;

const Contents = styled.div`
  padding: 5px 7px;
  word-wrap: break-word;
  &::after {
    content: ' \\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0';
    display: inline;
  }
`;

const Timestamp = styled.div`
  position: absolute;
  bottom: 2px;
  right: 7px;
  color: gray;
  font-size: 12px;
`;

/**\
 * I should like sort the messages by date...
 * and not add a message if we have its fucken id
 */
const MessagesList = ({ messages, me }) => {
  return (
    <Container>
      {messages.map(message => (
        <MessageItem
          data-testid="message-item"
          isMine={message.sender.id === me.id}
          key={message.id}>
          <Contents data-testid="message-content">{message.content}</Contents>
          <Timestamp data-testid="message-date">
            {moment(message.createdAt).format('HH:mm')}
          </Timestamp>
        </MessageItem>
      ))}
    </Container>
  );
};

MessagesList.propTypes = {
  me: PropTypes.shape({
    id: PropTypes.any
  }).isRequired,
  messages: PropTypes.shape({
    map: PropTypes.func
  }).isRequired
}

export default MessagesList;
