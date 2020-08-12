import gql from 'graphql-tag';

const USER_SUBSCRIPTION = gql`
  subscription($where: UserSubscriptionWhereInput) {
    userSub(where: $where) {
      node {
        id
        firstName
        lastName
        phone
        email
        emailValidated
        dob
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
        permissions
        token
        rehouserStamp
        acceptedSignupTerms
        acceptedTermsOfEngagement
      }
    }
  }
`;

export { USER_SUBSCRIPTION };
