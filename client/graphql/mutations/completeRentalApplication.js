import gql from 'graphql-tag';
import { RentalApplicationInfoFragment } from '../fragments/rentalApplicationInfo';

const COMPLETE_RENTAL_APPLICATION = gql`
  mutation completeRentalApplication($applicationId: ID!) {
    completeRentalApplication(applicationId: $applicationId) {
      ...rentalApplicationInfo
    }
  }
  ${RentalApplicationInfoFragment}
`;

export { COMPLETE_RENTAL_APPLICATION };
