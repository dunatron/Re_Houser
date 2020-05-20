import gql from 'graphql-tag';
import { RentalGroupApplicantInfoFragment } from './rentalGroupApplicantInfo';
import { PropertyInfoFragment } from './propertyInfo';
import { PublicUserInfoFragment } from './publicUserInfo';

const RentalApplicationInfoFragment = gql`
  fragment rentalApplicationInfo on RentalApplication {
    id
    visibility
    stage
    detailsStepComplete
    finalised
    owner {
      ...publicUserInfo
    }
    property {
      ...propertyInfo
    }
    leaseId
    applicants {
      ...rentalGroupApplicantInfo
    }
  }
  ${RentalGroupApplicantInfoFragment}
  ${PropertyInfoFragment}
  ${PublicUserInfoFragment}
`;

export { RentalApplicationInfoFragment };
