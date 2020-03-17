// import React from 'react';
// import moment from 'moment';
// import { List, ListItem } from '@material-ui/core';
// import styled from 'styled-components';
// import { useCallback } from 'react';
// import Router from 'next/router';
// import gql from 'graphql-tag';
// import { useQuery, useMutation } from '@apollo/client';
// import { CREATE_CHAT_MUTATION } from '../../graphql/mutations';
// import Error from '../ErrorMessage';
// import { getChatName } from '../../lib/getChatName';

// const Container = styled.div`
//   height: calc(100% - 56px);
//   overflow-y: overlay;
// `;

// const StyledList = styled(List)`
//   padding: 0 !important;
// `;

// const StyledListItem = styled(ListItem)`
//   height: 76px;
//   padding: 0 15px;
//   display: flex;
// `;

// const ChatPicture = styled.img`
//   height: 50px;
//   width: 50px;
//   object-fit: cover;
//   border-radius: 50%;
// `;

// const ChatInfo = styled.div`
//   width: calc(100% - 60px);
//   height: 46px;
//   padding: 15px 0;
//   margin-left: 10px;
//   border-bottom: 0.5px solid silver;
//   position: relative;
// `;

// const ChatName = styled.div`
//   margin-top: 5px;
// `;

// const MessageContent = styled.div`
//   color: gray;
//   font-size: 15px;
//   margin-top: 5px;
//   text-overflow: ellipsis;
//   overflow: hidden;
//   white-space: nowrap;
// `;

// const MessageDate = styled.div`
//   position: absolute;
//   color: gray;
//   top: 20px;
//   right: 0;
//   font-size: 13px;
// `;

// export const MY_CHATS_QUERY = gql`
//   query MY_CHATS_QUERY(
//     $where: ChatWhereInput
//     $orderBy: ChatOrderByInput
//     $skip: Int
//     $after: String
//     $before: String
//     $first: Int
//     $last: Int
//   ) {
//     chats(
//       where: $where
//       orderBy: $orderBy
//       skip: $skip
//       after: $after
//       before: $before
//       first: $first
//       last: $last
//     ) {
//       id
//       name
//       type
//       lastMessage {
//         id
//         isMine
//       }
//       participants {
//         id
//         firstName
//         lastName
//       }
//     }
//   }
// `;

// const ChatsList = props => {
//   const { data } = useQuery(MY_CHATS_QUERY, {
//     variables: {
//       where: {
//         participants_some: {
//           id_in: props.me.id,
//         },
//       },
//     },
//   });

//   const navToChat = chat => {
//     Router.push({
//       pathname: '/chat',
//       query: {
//         chatId: chat.id,
//       },
//     });
//   };
//   if (data === undefined || data.chats === undefined) {
//     return null;
//   }
//   let chats = data.chats;

//   return (
//     <Container>
//       <StyledList>
//         {chats.length === 0 && 'No CHats'}
//         {chats.map(chat => (
//           <StyledListItem
//             key={chat.id}
//             data-testid="chat"
//             button
//             // onClick={navToChat.bind(null, chat)}
//             onClick={() => navToChat(chat)}>
//             <ChatPicture
//               data-testid="picture"
//               src={chat.picture}
//               alt="Profile"
//             />
//             <ChatInfo>
//               <ChatName data-testid="name">
//                 {getChatName(chat, props.me)}
//               </ChatName>
//               {chat.lastMessage && (
//                 <React.Fragment>
//                   <MessageContent data-testid="content">
//                     {chat.lastMessage.content}
//                   </MessageContent>
//                   <MessageDate data-testid="date">
//                     {moment(chat.lastMessage.createdAt).format('HH:mm')}
//                   </MessageDate>
//                 </React.Fragment>
//               )}
//             </ChatInfo>
//           </StyledListItem>
//         ))}
//       </StyledList>
//     </Container>
//   );
// };

// export default ChatsList;

// import React, { useState } from 'react';
// import { GiftedChat, IMessage, User } from 'react-native-gifted-chat';
// import { View, Dimensions } from 'react-native';

// const App = () => {
//   const [messages, setMessages] = useState([
//     {
//       _id: 123,
//       text:
//         'This is a test of Gifted Chat for the WEB 🎉 \n https://github.com/FaridSafi/react-native-gifted-chat ',
//       user: {
//         _id: 2,
//         name: 'you',
//         avatar: '/me.jpg',
//       },
//       createdAt: new Date(),
//     },
//     {
//       _id: 456,
//       text:
//         'Find source code here: \n https://github.com/xcarpentier/gifted-chat-web-demo',
//       user: {
//         _id: 2,
//         name: 'you',
//         avatar: '/me.jpg',
//       },
//       createdAt: new Date(),
//     },
//   ]);
//   const onSend = newMsg => setMessages([...messages, ...newMsg]);
//   const user = { _id: 1, name: 'me' };
//   const inverted = false;
//   const { width, height } = Dimensions.get('window');

//   // return <GiftedChat {...{ messages, onSend, user, inverted }} />;
//   return (
//     <View style={{ width, height }}>
//       <GiftedChat {...{ messages, onSend, user, inverted }} />
//     </View>
//   );
// };

// export default App;

import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
const { GiftedChat, IMessage, User } = require('react-native-gifted-chat');
// import { GiftedChat, IMessage, User } from 'react-native-gifted-chat';

//https://www.npmjs.com/package/react-native-gifted-chat/v/next#react-native-web
//https://github.com/necolas/react-native-web

export default function App(props) {
  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.text}>
        React Native for Web & Next.js
      </Text>

      <Text style={styles.link} accessibilityRole="link" href={`/alternate`}>
        A universal link
      </Text>

      <View style={styles.textContainer}>
        <GiftedChat />
        <Text accessibilityRole="header" aria-level="2" style={styles.text}>
          Subheader
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  link: {
    color: 'blue',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  text: {
    alignItems: 'center',
    fontSize: 24,
    marginBottom: 24,
  },
});
