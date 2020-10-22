import gql from 'graphql-tag';
import { FileInfoFragment } from './fileInfo';
import { RefereeInfoFragment } from './refereeInfo';

//should probably move awaitingFriends and friend request from here
const UserInfoFragment = gql`
  fragment userInfo on User {
    id
    createdAt
    updatedAt
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
    referees {
      ...refereeInfo
    }
    referee1Relationhip
    referee1Name
    referee1Phone
    referee1Email
    referee2Relationhip
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
    bondLodgementNumber
  }
  ${FileInfoFragment}
  ${RefereeInfoFragment}
`;

export { UserInfoFragment };
export default UserInfoFragment;
