import gql from 'graphql-tag';
import { FileInfoFragment } from './fileInfo';

//should probably move awaitingFriends and friend request from here
const UserInfoFragment = gql`
  fragment userInfo on User {
    id
    email
    emailValidated
    firstName
    lastName
    dob
    phone
    permissions
    acceptedSignupTerms
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
    currentAddress {
      placeId
      desc
      lat
      lng
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
    adminSettings {
      appraisalCreatedSub
      propertyCreatedSub
      rentalApplicationCreatedSub
      leaseCreatedSub
    }
    acceptedTermsOfEngagement
    bankDetails {
      name
      bankNumber
      branchNumber
      accountNumber
      suffix
    }
  }
  ${FileInfoFragment}
`;

export { UserInfoFragment };
export default UserInfoFragment;
