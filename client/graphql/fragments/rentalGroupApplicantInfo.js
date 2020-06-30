import gql from 'graphql-tag';
import { PreTenancyInfoFragment } from './preTenancyInfo';
import { FileInfoFragment } from './fileInfo';
import { PublicUserInfoFragment } from './publicUserInfo';

const RentalGroupApplicantInfoFragment = gql`
  fragment rentalGroupApplicantInfo on RentalGroupApplicant {
    id
    approved
    completed
    email
    firstName
    lastName
    user {
      ...publicUserInfo
      photoIdentification {
        ...fileInfo
      }
    }
    preTenancyApplicationForm {
      ...preTenancyInfo
    }
  }
  ${FileInfoFragment}
  ${PreTenancyInfoFragment}
  ${PublicUserInfoFragment}
`;

export { RentalGroupApplicantInfoFragment };
