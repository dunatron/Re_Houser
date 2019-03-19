import React, { Component } from "react"
import { Mutation } from "react-apollo"
import { CREATE_RENTAL_APPLICATION } from "../../mutation/index"
import { adopt } from "react-adopt"
import User from "../User/index"
import RentalApplications from "./RentalApplications"
import Button from "@material-ui/core/Button"

const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  createRentalApplication: ({ render }) => (
    <Mutation mutation={CREATE_RENTAL_APPLICATION}>{render}</Mutation>
  ),
})

export default class Apply extends Component {
  _apply = async createRentalApplication => {
    const res = await createRentalApplication()
    console.log("res => ", res)
  }
  _createRentalApplication = async (createRentalApplication, me) => {
    const { id, rentalApplications } = this.props.property
    const res = await createRentalApplication({
      variables: {
        data: {
          stage: "PENDING",
          property: {
            connect: {
              id: id,
            },
          },
          applicants: {
            connect: [
              {
                id: me.id,
              },
            ],
          },
        },
      },
    })
    console.log("res => ", res)
  }
  _variables = () => {}
  render() {
    const { id, rentalApplications } = this.props.property
    return (
      <Composed>
        {({ user, createRentalApplication }) => {
          const me = user.data.me
          if (!me) return <h1>No User</h1>
          return (
            <div>
              <Button
                onClick={() =>
                  this._createRentalApplication(createRentalApplication, me)
                }>
                Create New Group Application
              </Button>
              <RentalApplications applications={rentalApplications} />
            </div>
          )
        }}
      </Composed>
    )
  }
}
