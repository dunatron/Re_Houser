import gql from 'graphql-tag';
import { FileInfoFragment } from './fileInfo';

//should probably move awaitingFriends and friend request from here
const UserInfoFragment = gql`
  fragment userInfo on User {
    id
    email
    firstName
    lastName
    phone
    permissions
    photoIdentification {
      ...fileInfo
    }
    profilePhoto {
      ...fileInfo
    }
    signature {
      ...fileInfo
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
    rehouserStamp
    usedFreeAppraisal
  }
  ${FileInfoFragment}
`;

export { UserInfoFragment };
export default UserInfoFragment;
