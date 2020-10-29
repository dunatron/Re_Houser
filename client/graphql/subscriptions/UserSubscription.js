import gql from 'graphql-tag';

import * as fragments from '../fragments';

// const USER_SUBSCRIPTION = gql`
//   subscription userSub($where: UserSubscriptionWhereInput) {
//     userSub(where: $where) {
//       node {
//         id
//         ...userInfo
//       }
//     }
//   }
//   ${fragments.UserInfoFragment}
// `;

// export { USER_SUBSCRIPTION };

// const USER_SUBSCRIPTION = gql`
//   subscription($where: UserSubscriptionWhereInput) {
//     userSub(where: $where) {
//       node {
//         id
//         isAdmin @client
//         isWizard @client
//         createdAt
//         updatedAt
//         email
//         emailValidated
//         firstName
//         lastName
//         dob
//         phone
//         permissions
//         acceptedSignupTerms
//         photoIdentification {
//           ...fileInfo
//         }
//         profilePhoto {
//           ...fileInfo
//         }
//         signature {
//           ...fileInfo
//         }
//         identificationNumber
//         emergencyContactName
//         emergencyContactNumber
//         emergencyContactEmail
//         referees {
//           ...refereeInfo
//         }
//         referee1Relationhip
//         referee1Name
//         referee1Phone
//         referee1Email
//         referee2Relationhip
//         referee2Name
//         referee2Phone
//         referee2Email
//         primaryCreditCard {
//           id
//         }
//         currentAddress {
//           placeId
//           desc
//           lat
//           lng
//         }
//         friendRequests {
//           id
//           requestUser {
//             id
//             firstName
//             lastName
//           }
//         }
//         awaitingFriends {
//           id
//           acceptingUser {
//             id
//             firstName
//             lastName
//           }
//         }
//         rehouserStamp
//         adminSettings {
//           appraisalCreatedSub
//           propertyCreatedSub
//           rentalApplicationCreatedSub
//           leaseCreatedSub
//         }
//         acceptedTermsOfEngagement
//         bankDetails {
//           name
//           bankNumber
//           branchNumber
//           accountNumber
//           suffix
//         }
//         bondLodgementNumber
//       }
//     }
//   }
//   ${fragments.RefereeInfoFragment}
//   ${fragments.FileInfoFragment}
// `;

const USER_SUBSCRIPTION = gql`
  subscription($where: UserSubscriptionWhereInput) {
    userSub(where: $where) {
      node {
        id
        isAdmin @client
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
        profilePhoto {
          id
          url
        }
        photoIdentification {
          id
          url
        }
      }
    }
  }
`;

export { USER_SUBSCRIPTION };
