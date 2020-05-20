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
