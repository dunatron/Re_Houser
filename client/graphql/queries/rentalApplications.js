import gql from 'graphql-tag';
import { RentalApplicationInfoFragment } from '../fragments/rentalApplicationInfo';

const RENTAL_APPLICATIONS_QUERY = gql`
  query RENTAL_APPLICATIONS_QUERY($where: RentalApplicationWhereInput!) {
    rentalApplications(where: $where) {
      ...rentalApplicationInfo
    }
  }
  ${RentalApplicationInfoFragment}
`;
export { RENTAL_APPLICATIONS_QUERY };
