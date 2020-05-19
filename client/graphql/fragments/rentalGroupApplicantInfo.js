import gql from 'graphql-tag';
import { PreTenancyInfoFragment } from './preTenancyInfo';
import { FileInfoFragment } from './fileInfo';

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
        ...fileInfo
      }
    }
    preTenancyApplicationForm {
      ...preTenancyInfo
    }
  }
  ${FileInfoFragment}
  ${PreTenancyInfoFragment}
`;

export { RentalGroupApplicantInfoFragment };
