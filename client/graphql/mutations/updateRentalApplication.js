//updateRentalApplication
import gql from 'graphql-tag';
import { RentalApplicationInfoFragment } from '../fragments/rentalApplicationInfo';

const UPDATE_RENTAL_APPLICATION_MUTATION = gql`
  mutation updateRentalApplication(
    $data: RentalApplicationUpdateInput!
    $where: RentalApplicationWhereUniqueInput!
  ) {
    updateRentalApplication(data: $data, where: $where) {
      ...rentalApplicationInfo
    }
  }
  ${RentalApplicationInfoFragment}
`;

export { UPDATE_RENTAL_APPLICATION_MUTATION };
