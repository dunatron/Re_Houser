import gql from "graphql-tag"

const RENTAL_APPLICATION_CREATED_SUBSCRIPTION = gql`
  subscription {
    rentalApplicationCreatedSub {
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
`

export { RENTAL_APPLICATION_CREATED_SUBSCRIPTION }

// import gql from "graphql-tag"
// import { RentalApplicationInfoFragment } from "../fragments/rentalApplicationInfo"

// const RENTAL_APPLICATION_CREATED_SUBSCRIPTION = gql`
//   subscription {
//     rentalApplicationCreatedSub {
//       node {
//         ...rentalApplicationInfo
//       }
//       ${RentalApplicationInfoFragment}
//     }

//   }

// `
// export { RENTAL_APPLICATION_CREATED_SUBSCRIPTION }
