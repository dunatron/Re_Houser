import gql from 'graphql-tag';
/**
 * Not working.. maybe because we are spreading on an array
 */
const PreTenancyInfoFragment = gql`
  fragment preTenancyInfo on PreTenancyForm {
    firstTimeTenant
    preferredMoveInDate
    fullName
    dob
    under18
    phone
    email
    currentLocation
    proofOfAddress {
      id
      updatedAt
      createdAt
      filename
      mimetype
      encoding
      url
    }
    yearsAtAddress
    monthsAtAddress
    reasonForLeaving
    currentLandlordName
    currentLandlordNumber
    currentLandlordEmail
    consentToLandlordContact
    referrence1Name
    referrence1Phone
    referrence1Email
    referrence2Name
    referrence2Phone
    referrence2Email
    acceptedTerms
  }
`;

export { PreTenancyInfoFragment };
