import gql from 'graphql-tag';

const RENTAL_APPLICATION_SUBSCRIPTION = gql`
  subscription($where: RentalApplicationSubscriptionWhereInput) {
    rentalApplicationUpdateSub(where: $where) {
      node {
        id
        visibility
        stage
        finalised
        owner {
          id
          email
          firstName
          lastName
        }
        property {
          id
          location
        }
        applicants {
          id
          approved
          completed
          email
          firstName
          user {
            id
            firstName
            lastName
          }
        }
      }
    }
  }
`;

export { RENTAL_APPLICATION_SUBSCRIPTION };
