import gql from 'graphql-tag';
import { RentalApplicationInfoFragment } from '../fragments/rentalApplicationInfo';

const RENTAL_APPLICATION_SUBSCRIPTION = gql`
  subscription rentalApplicationSub(
    $where: RentalApplicationSubscriptionWhereInput
  ) {
    rentalApplicationSub(where: $where) {
      node {
        ...rentalApplicationInfo
      }
    }
  }
  ${RentalApplicationInfoFragment}
`;

export { RENTAL_APPLICATION_SUBSCRIPTION };
