import gql from "graphql-tag"
import { RentalApplicationInfoFragment } from "../fragments/rentalApplicationInfo"

const CREATE_RENTAL_APPLICATION = gql`
  mutation createRentalApplication($data: RentalApplicationCreateInput!) {
    createRentalApplication(data: $data) {
      ...rentalApplicationInfo
    }
  }
  ${RentalApplicationInfoFragment}
`

export { CREATE_RENTAL_APPLICATION }
