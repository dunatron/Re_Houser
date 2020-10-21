import gql from 'graphql-tag';
import { RentalApplicationInfoFragment } from '../fragments/rentalApplicationInfo';

const RENTAL_APPLICATION_CREATED_SUBSCRIPTION = gql`
  subscription rentalApplicationCreatedSub {
    rentalApplicationCreatedSub {
      node {
        ...rentalApplicationInfo
      }
    }
  }
  ${RentalApplicationInfoFragment}
`;
export { RENTAL_APPLICATION_CREATED_SUBSCRIPTION };
