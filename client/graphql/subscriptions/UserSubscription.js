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

// import gql from 'graphql-tag';

// import * as fragments from '../fragments';

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

// import gql from 'graphql-tag';

// import * as fragments from '../fragments';

/**
 * NOTE CANT USE userInfo fragment as it has @client fields and will destroy subs
 */
// const USER_SUBSCRIPTION = gql`
//   subscription userSub($where: UserSubscriptionWhereInput) {
//     userSub(where: $where) {
//       node {
//         id
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
//   ${fragments.FileInfoFragment}
//   ${fragments.RefereeInfoFragment}
// `;

// const USER_SUBSCRIPTION = gql`
//   subscription userSub($where: UserSubscriptionWhereInput) {
//     userSub(where: $where) {
//       node {
//         id
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
//   ${fragments.FileInfoFragment}
//   ${fragments.RefereeInfoFragment}
// `

// // below referee2Email is the culprit somewhere
// // possibly rehouser stamp???
// // definately rehouserStamp
// const USER_SUBSCRIPTION = gql`
//   subscription userSub($where: UserSubscriptionWhereInput) {
//     userSub(where: $where) {
//       node {
//         id
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
//         identificationNumber
//         emergencyContactName
//         emergencyContactNumber
//         emergencyContactEmail
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
// `;

/**
 * rehouserStamp seemed to break siging in entirely even. SOmething else seemed to break it when trying to confirm...
 */
// const USER_SUBSCRIPTION = gql`
//   subscription userSub($where: UserSubscriptionWhereInput) {
//     userSub(where: $where) {
//       node {
//         id
//         updatedAt
//         emailValidated
//         firstName
//         lastName
//         dob
//         phone
//         permissions
//         acceptedSignupTerms
//         identificationNumber
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
// `;

// export { USER_SUBSCRIPTION };

// below referee2Email is the culprit somewhere
// possibly rehouser stamp???
// Doesnt crash but does something else prevent the other windows signup form pushing...
const USER_SUBSCRIPTION = gql`
  subscription userSub($where: UserSubscriptionWhereInput) {
    userSub(where: $where) {
      node {
        id
        email
        emailValidated
        firstName
        lastName
      }
    }
  }
`;

export { USER_SUBSCRIPTION };
