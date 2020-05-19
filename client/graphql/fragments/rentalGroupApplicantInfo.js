import gql from 'graphql-tag';
import { PreTenancyInfoFragment } from './preTenancyInfo';

const RentalGroupApplicantInfoFragment = gql`
  fragment rentalGroupApplicantInfo on RentalGroupApplicant {
    id
    approved
    completed
    email
    firstName
    lastName
    user {
      id
      firstName
      lastName
      profilePhoto {
        id
        updatedAt
        createdAt
        filename
        mimetype
        encoding
        url
      }
    }
    preTenancyApplicationForm {
      ...preTenancyInfo
    }
  }
  ${PreTenancyInfoFragment}
`;

export { RentalGroupApplicantInfoFragment };
