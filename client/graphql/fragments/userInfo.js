import gql from 'graphql-tag';
import chat from './chat.fragment';

const UserInfoFragment = gql`
  fragment userInfo on User {
    id
    email
    firstName
    lastName
    phone
    permissions
    photoIdentification {
      createdAt
      updatedAt
      filename
      mimetype
      encoding
      url
    }
    profilePhoto {
      createdAt
      updatedAt
      filename
      mimetype
      encoding
      url
    }
    identificationNumber
    emergencyContactName
    emergencyContactNumber
    emergencyContactEmail
    referee1Name
    referee1Phone
    referee1Email
    referee2Name
    referee2Phone
    referee2Email
    primaryCreditCard {
      id
    }
    friends {
      id
      firstName
      lastName
      email
    }
    friendRequests {
      id
      requestUser {
        id
        firstName
        lastName
      }
    }
    awaitingFriends {
      id
      acceptingUser {
        id
        firstName
        lastName
      }
    }
    chats {
      ...Chat
    }
  }
  ${chat}
`;

export { UserInfoFragment };
export default UserInfoFragment;
