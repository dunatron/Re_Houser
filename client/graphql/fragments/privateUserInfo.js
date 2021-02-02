import gql from 'graphql-tag';
import { FileInfoFragment } from './fileInfo';
import { RefereeInfoFragment } from './refereeInfo';
import { AddressInfoFragment } from './addressInfo';
import { ForeignLinkInfoFragment } from './foreignLinkInfo';
import { BankDetailInfoFragment } from './bankDetailInfo';

const PrivateUserInfoFragment = gql`
  fragment privateUserInfo on User {
    id
    createdAt
    updatedAt
    foreignLinks {
      ...foreignLinkInfo
    }
    dob
    isAdmin @client
    isWizard @client
    firstName
    lastName
    phone
    email
    rehouserStamp
    emailValidated
    permissions
    profilePhoto {
      ...fileInfo
    }
    photoIdType
    photoIdentification {
      ...fileInfo
    }
    identificationNumber
    rehouserStamp
    emergencyContactName
    emergencyContactNumber
    emergencyContactEmail
    referees {
      ...refereeInfo
    }
    signature {
      ...fileInfo
    }
    currentAddress {
      ...addressInfo
    }
    proofOfAddress {
      ...fileInfo
    }
    acceptedSignupTerms
    acceptedTermsOfEngagement
    bankDetails {
      ...bankDetailInfo
    }
    bondLodgementNumber
  }
  ${FileInfoFragment}
  ${RefereeInfoFragment}
  ${AddressInfoFragment}
  ${ForeignLinkInfoFragment}
  ${BankDetailInfoFragment}
`;

export { PrivateUserInfoFragment };

export default PrivateUserInfoFragment;
// These are still to come in some shape or form ideally.
// or perhaps not. On the component should perhaps pass in Connection Tables
// friends: [User!]!
// friendRequests: [FriendRequest!]!
//   @relation(name: "PendingFriendRequests", onDelete: CASCADE)
// awaitingFriends: [FriendRequest!]!
//   @relation(name: "AwaitingFriendRequests", onDelete: CASCADE)
// properties: [Property!]! @relation(name: "PropertyOwner", onDelete: SET_NULL)
// managedProperties: [Property!]!
//   @relation(name: "PropertyAgents", onDelete: SET_NULL)
// lesseeLeases: [Lessee!]!
//   @relation(name: "UserLesseeLeases", onDelete: SET_NULL)
// lessorLeases: [Lessor!]!
//   @relation(name: "UserLessorLeases", onDelete: SET_NULL)
// createdProperties: [Property!]!
//   @relation(name: "PropertyCreator", onDelete: SET_NULL)
// creditCards: [CreditCard!]!
//   @relation(name: "UserCreditCards", onDelete: CASCADE)
// primaryCreditCard: CreditCard @relation(name: "UserPrimaryCreditCard")
// chats: [Chat!]! @relation(name: "UserChats", onDelete: SET_NULL)
// sentMessages: [Message!]!
//   @relation(name: "UserSentMessages", onDelete: SET_NULL)
// recievedMessages: [Message!]!
//   @relation(name: "UserRecievedMessages", onDelete: SET_NULL)

// activity: [Activity!]! @relation(name: "UserActivity", onDelete: SET_NULL)

// involvedActivity: [Activity!]!
//   @relation(name: "InvolvedActivity", onDelete: SET_NULL)

// rentalAppraisals: [RentalAppraisal] @relation(name: "UserRentalAppraisals")
// appraisedApplications: [RentalAppraisal]
//   @relation(name: "UserAppraisalsAppraised")
// adminSettings: AdminSetting!
//   @relation(name: "UserAdminSettings", link: TABLE, onDelete: CASCADE)
// viewings: [Viewing!]! @relation(name: "HostViewings", onDelete: SET_NULL)
//   @relation(name: "UserBankDetails", link: TABLE, onDelete: CASCADE)
// inspections: [Inspection]
//   @relation(name: "InspectionInspector", link: TABLE, onDelete: SET_NULL)
// bondLodgementNumber: String
