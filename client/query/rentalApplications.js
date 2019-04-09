import gql from "graphql-tag"

const RENTAL_APPLICATIONS_QUERY = gql`
  query RENTAL_APPLICATIONS_QUERY($where: RentalApplicationWhereInput!) {
    rentalApplications(where: $where) {
      id
      stage
      owner {
        id
      }
      applicants {
        id
        approved
        completed
        user {
          id
          firstName
          lastName
        }
      }
    }
  }
`
export { RENTAL_APPLICATIONS_QUERY }
