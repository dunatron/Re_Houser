import React, { Component } from "react"
import { Mutation } from "react-apollo"
import { CREATE_RENTAL_APPLICATION } from "../../mutation/index"
import { RENTAL_APPLICATIONS_QUERY } from "../../query/index"

import { adopt } from "react-adopt"
import User from "../User/index"
import RentalApplications from "./RentalApplications"
import Button from "@material-ui/core/Button"
import Error from "../ErrorMessage/index"

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
          owner: {
            connect: {
              id: me.id,
            },
          },
        },
      },
    })
    console.log("res => ", res)
  }
  _variables = () => {}
  update = (cache, payload) => {
    // const { id } = this.props.property
    // const variables = {
    //   where: {
    //     property: {
    //       id: id,
    //     },
    //   },
    // }
    // const data = cache.readQuery({
    //   query: RENTAL_APPLICATIONS_QUERY,
    //   variables: variables,
    // })
    // data.rentalApplications.push({ ...payload.data.createRentalApplication })
    // cache.writeQuery({
    //   query: RENTAL_APPLICATIONS_QUERY,
    //   data,
    //   variables: variables,
    // })
  }
  render() {
    const { id } = this.props.property
    return (
      <Composed>
        {({ user, createRentalApplication }) => {
          const me = user.data.me
          if (!me) return <h1>No User</h1>
          return (
            <div>
              <Mutation
                mutation={CREATE_RENTAL_APPLICATION}
                // refetchQueries={[
                //   { query: PROPERTIES_QUERY },
                //   { query: OWNER_PROPERTIES_QUERY },
                // ]}
                // variables={this._variables()}
                update={this.update}>
                {(createRentalApplication, { error }) => (
                  <>
                    <Error error={error} />
                    <Button
                      color="primary"
                      onClick={() =>
                        this._createRentalApplication(
                          createRentalApplication,
                          me
                        )
                      }>
                      Create New Group Application
                    </Button>
                    <RentalApplications propertyId={id} />
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
