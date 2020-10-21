import gql from 'graphql-tag';

import { RentalApplicationInfoFragment } from '../fragments/rentalApplicationInfo';

const RENTAL_APPLICATION_UPDATED_SUBSCRIPTION = gql`
  subscription rentalApplicationUpdateSub(
    $where: RentalApplicationSubscriptionWhereInput
  ) {
    rentalApplicationUpdateSub(where: $where) {
      node {
        ...rentalApplicationInfo
      }
    }
  }
  ${RentalApplicationInfoFragment}
`;

export { RENTAL_APPLICATION_UPDATED_SUBSCRIPTION };
