import gql from 'graphql-tag';
import { RentalGroupApplicantInfoFragment } from './rentalGroupApplicantInfo';
import { PropertyInfoFragment } from './propertyInfo';

const RentalApplicationInfoFragment = gql`
  fragment rentalApplicationInfo on RentalApplication {
    id
    visibility
    stage
    detailsStepComplete
    finalised
    owner {
      id
      email
      firstName
      lastName
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
`;

export { RentalApplicationInfoFragment };
