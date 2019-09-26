// {
//   "where": {
//     "id": ""
//   }
// }

import gql from 'graphql-tag';
import { RentalApplicationInfoFragment } from '../fragments/rentalApplicationInfo';

const SINGLE_RENTAL_APPLICATION_QUERY = gql`
  query SINGLE_RENTAL_APPLICATION_QUERY(
    $where: RentalApplicationWhereUniqueInput!
  ) {
    rentalApplication(where: $where) {
      ...rentalApplicationInfo
    }
  }
  ${RentalApplicationInfoFragment}
`;
export { SINGLE_RENTAL_APPLICATION_QUERY };
