import React, { useState } from "react"
import { useMutation } from "@apollo/react-hooks"
import Fab from "@material-ui/core/Fab"
import Error from "../ErrorMessage/index"
import Tooltip from "@material-ui/core/Tooltip"
import { useCurrentUser } from "../User/index"
// Mutations
import { APPLY_TO_RENTAL_GROUP_APPLICATION } from "../../mutation/index"

//icons
import PersonIcon from "@material-ui/icons/Person"
import PersonAddIcon from "@material-ui/icons/PersonAdd"

const ApplyToGroup = props => {
  const { applicationId, property, application, openRentalAppModal } = props
  const userProps = useCurrentUser()
  const { me } = userProps.data

  const [applyToRentalGroup, applyToRentalGroupProps] = useMutation(
    APPLY_TO_RENTAL_GROUP_APPLICATION,
    {
      variables: {
        data: {
          user: {
            connect: {
              id: me.id,
            },
          },
          approved: false,
          application: {
            connect: {
              id: applicationId,
            },
          },
        },
      },
      update: (proxy, payload) => {
        const rentalData = payload.data.applyToRentalGroup
        openRentalAppModal(rentalData)
      },
    }
  )
  return (
    <>
      <Error error={applyToRentalGroupProps.error} />
      <Tooltip title={`apply to group`} placement="top">
        <Fab
          size="small"
          color="secondary"
          aria-label="Delete"
          style={{ cursor: "pointer" }}
          onClick={() => applyToRentalGroup()}>
          <PersonAddIcon className="person__icon" />
        </Fab>
      </Tooltip>
    </>
  )
}

export default ApplyToGroup
