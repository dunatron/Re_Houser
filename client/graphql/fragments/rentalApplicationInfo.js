import gql from 'graphql-tag';
import { RentalGroupApplicantInfoFragment } from './rentalGroupApplicantInfo';
import { PropertyInfoFragment } from './propertyInfo';

const RentalApplicationInfoFragment = gql`
  fragment rentalApplicationInfo on RentalApplication {
    id
    visibility
    stage
    finalised
    # applicants {
    #   ...RentalGroupApplicantData
    # }
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
      # id
      # approved
      # completed
      # email
      # firstName
      # user {
      #   id
      #   firstName
      #   lastName
      # }
      ...rentalGroupApplicantInfo
    }
  }
  ${RentalGroupApplicantInfoFragment}
  ${PropertyInfoFragment}
`;

export { RentalApplicationInfoFragment };
