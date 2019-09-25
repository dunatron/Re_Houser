import gql from 'graphql-tag';

const MY_LEASES_QUERY = gql`
  query MY_LEASES_QUERY($where: PropertyLeaseWhereInput) {
    myLeases(where: $where) {
      id
      location
      rent
      finalised
      moveInDate
      expiryDate
      lessees {
        id
        signed
        user {
          id
          email
        }
      }
      lessors {
        id
        signed
        user {
          id
          email
        }
      }
    }
  }
`;
export { MY_LEASES_QUERY };
