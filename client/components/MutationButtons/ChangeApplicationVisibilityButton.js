import React, { useState } from "react"
import gql from "graphql-tag"
import { useMutation } from "react-apollo-hooks"
import Error from "../ErrorMessage"
import SelectOption from "../../components/Inputs/SelectOption"
/**
 * PRIVATE
 * FRIENDS_ONLY
 * PUBLIC
 */
const UPDATE_APPLICATION_VISIBILITY_MUTATION = gql`
  mutation UPDATE_APPLICATION_VISIBILITY_MUTATION(
    $data: RentalApplicationUpdateInput!
    $where: RentalApplicationWhereUniqueInput!
  ) {
    updateRentalApplication(data: $data, where: $where) {
      id
      visibility
    }
  }
`
const options = [
  {
    name: "Private",
    value: "PRIVATE",
  },
  {
    name: "Friend Only",
    value: "FRIENDS_ONLY",
  },
  {
    name: "Public",
    value: "PUBLIC",
  },
]
const ChangeApplicationVisibilityBtn = ({ applicationId, visibility }) => {
  const [updateVisibility, updateVisibilityProps] = useMutation(
    UPDATE_APPLICATION_VISIBILITY_MUTATION
  )
  return (
    <>
      <Error error={updateVisibilityProps.error} />
      <SelectOption
        disabled={updateVisibilityProps.loading}
        value={visibility}
        options={options}
        label="Visibility"
        handleChange={e =>
          updateVisibility({
            variables: {
              data: {
                visibility: e.target.value,
              },
              where: {
                id: applicationId,
              },
            },
          })
        }
      />
    </>
  )
}

export default ChangeApplicationVisibilityBtn
