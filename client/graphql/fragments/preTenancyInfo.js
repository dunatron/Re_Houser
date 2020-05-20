import gql from 'graphql-tag';
import { FileInfoFragment } from './fileInfo';

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
      ...fileInfo
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
  ${FileInfoFragment}
`;

export { PreTenancyInfoFragment };
