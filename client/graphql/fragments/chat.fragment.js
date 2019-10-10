import gql from 'graphql-tag';
import message from './message.fragment';

export default gql`
  fragment Chat on Chat {
    id
    name
    picture
    lastMessage {
      ...Message
    }
    participants {
      id
    }
    seenInfo {
      id
      lastSeen
      amountSeen
      seenUserId
    }
  }
  ${message}
`;
