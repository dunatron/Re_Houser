import React, { Component } from "react"
import { adopt } from "react-adopt"
import { Mutation } from "react-apollo"
import Fab from "@material-ui/core/Fab"
import Error from "../ErrorMessage/index"
import Tooltip from "@material-ui/core/Tooltip"
import User from "../User/index"
import { openSnackbar } from "../Notifier/index"
// Mutations
import { APPLY_TO_RENTAL_GROUP_APPLICATION } from "../../mutation/index"

//icons
import PersonIcon from "@material-ui/icons/Person"
import PersonAddIcon from "@material-ui/icons/PersonAdd"

const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
})

class DeleteFile extends Component {
  update = (cache, payload) => {
    // manually update the cache on the client, so it matches the server
    // 1. Read the cache for the items we want
    const data = cache.readQuery({ query: ALL_FILES_QUERY })
    // 2. Filter the deleted itemout of the page
    data.files = data.files.filter(
      file => file.id !== payload.data.deleteFile.id
    )
    // 3. Put the items back!
    cache.writeQuery({ query: ALL_FILES_QUERY, data })
  }
  _variables = () => {
    return {
      data: {
        user: {
          connect: {
            id: "${UserID}",
          },
        },
        approved: false,
        application: {
          connect: {
            id: "${applicationID}",
          },
        },
      },
    }
  }
  _applyToGroup = async (applyToRentalGroup, me) => {
    const { applicationId } = this.props
    const res = await applyToRentalGroup({
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
    })
    openSnackbar({
      message: `Successfully applied to group`,
      duration: 6000,
      type: "success",
    })
  }
  render() {
    return (
      <Composed>
        {({ user, createRentalApplication }) => {
          const me = user.data.me
          if (!me) return <h1>No User</h1>
          return (
            <Mutation
              mutation={APPLY_TO_RENTAL_GROUP_APPLICATION}
              // variables={this._variables()}
              update={this.update}>
              {(applyToRentalGroup, { error }) => (
                <>
                  <Error error={error} />
                  <Tooltip title={`apply to group`} placement="top">
                    <Fab
                      size="small"
                      color="secondary"
                      aria-label="Delete"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        this._applyToGroup(applyToRentalGroup, me)
                      }>
                      <PersonAddIcon className="person__icon" />
                    </Fab>
                  </Tooltip>
                </>
              )}
            </Mutation>
          )
        }}
      </Composed>
    )
  }
}

export default DeleteFile
