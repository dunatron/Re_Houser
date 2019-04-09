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

class ApplyToGroup extends Component {
  state = {
    modalIsOpen: false,
    applicationData: {},
  }
  update = (cache, payload) => {
    // manually update the cache on the client, so it matches the server
    // 1. Read the cache for the items we want
    // const data = cache.readQuery({ query: ALL_FILES_QUERY })
    // // 2. Filter the deleted itemout of the page
    // data.files = data.files.filter(
    //   file => file.id !== payload.data.deleteFile.id
    // )
    // // 3. Put the items back!
    // cache.writeQuery({ query: ALL_FILES_QUERY, data })
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
    const rentalData = res.data.applyToRentalGroup
    // Do an update of the cache and lauch modal from parent container
    console.log("rentalData => ", rentalData)
    // STep 1 update cache
    // STep 2 open modal through props
    this.props.openRentalAppModal(rentalData  )
  }
  render() {
    return (
      <Composed>
        {({ user, createRentalApplication }) => {
          const me = user.data.me
          const property = this.props.property
          const application = this.props.application
          if (!me) return <h1>No User</h1>

          return (
            <div>
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
                        onClick={() => {
                          this._applyToGroup(applyToRentalGroup, me)
                          this.setState({
                            modalIsOpen: true,
                          })
                        }}>
                        <PersonAddIcon className="person__icon" />
                      </Fab>
                    </Tooltip>
                  </>
                )}
              </Mutation>
            </div>
          )
        }}
      </Composed>
    )
  }
}

export default ApplyToGroup
