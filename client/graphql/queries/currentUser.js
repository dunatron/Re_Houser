// import gql from 'graphql-tag';
import { gql } from '@apollo/client';
import { UserInfoFragment } from '../fragments/userInfo';

// const CURRENT_USER_QUERY = gql`
//   query CURRENT_USER_QUERY {
//     me {
//       ...userInfo
//     }
//   }
//   ${UserInfoFragment}
// `;

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      firstAndLastName @client
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
        id
        url
      }
      profilePhoto {
        id
        url
      }
      signature {
        id
        url
      }
      identificationNumber
      emergencyContactName
      emergencyContactNumber
      emergencyContactEmail
      referees {
        id
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
  }
`;

export { CURRENT_USER_QUERY };
export default CURRENT_USER_QUERY;
