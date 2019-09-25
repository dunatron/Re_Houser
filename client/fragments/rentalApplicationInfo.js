import gql from 'graphql-tag';
import { RentalGroupApplicantInfoFragment } from './rentalGroupApplicantInfo';

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
`;

export { RentalApplicationInfoFragment };
