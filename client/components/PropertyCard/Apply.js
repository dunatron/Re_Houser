import React, { Component } from "react"
import { Mutation } from "react-apollo"
import { CREATE_RENTAL_APPLICATION } from "../../mutation/index"
import { RENTAL_APPLICATIONS_QUERY } from "../../query/index"

import { adopt } from "react-adopt"
import User from "../User/index"
import RentalApplications from "./RentalApplications"
import Button from "@material-ui/core/Button"
import Error from "../ErrorMessage/index"
import SuperLogin from "../SuperLogin"
import Modal from "../Modal/index"
import RentalApplicationStepperComponent from "../RentalApplicationStepper/index"

const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  createRentalApplication: ({ render }) => (
    <Mutation mutation={CREATE_RENTAL_APPLICATION}>{render}</Mutation>
  ),
})

export default class Apply extends Component {
  state = {
    modalIsOpen: false,
    applicationData: {},
  }
  _apply = async createRentalApplication => {
    const res = await createRentalApplication()
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
    return res
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
  rentalApplicationStepper = async (createRentalApplication, me) => {
    const application = await this._createRentalApplication(
      createRentalApplication,
      me
    )

    this.setState({
      modalIsOpen: true,
      applicationData: application.data.createRentalApplication,
    })
  }
  render() {
    const { id, location } = this.props.property
    const { modalIsOpen, applicationData } = this.state
    return (
      <Composed>
        {({ user, createRentalApplication }) => {
          const me = user.data.me
          if (!me) return <SuperLogin />
          return (
            <div>
              <Modal
                open={modalIsOpen}
                title={`Application for ${location}`}
                close={() => this.setState({ modalIsOpen: false })}>
                <RentalApplicationStepperComponent
                  property={this.props.property}
                  me={me}
                  application={applicationData}
                />
              </Modal>
              <Mutation
                mutation={CREATE_RENTAL_APPLICATION}
                // refetchQueries={[
                //   { query: PROPERTIES_QUERY },
                //   { query: OWNER_PROPERTIES_QUERY },
                // ]}
                // variables={this._variables()}
                update={this.update}>
                {(createRentalApplication, { error, loading }) => (
                  <>
                    <Error error={error} />
                    <Button
                      disabled={loading}
                      color="primary"
                      variant="outlined"
                      style={{ padding: "16px", margin: "0 0 16px 0" }}
                      onClick={() =>
                        this.rentalApplicationStepper(
                          createRentalApplication,
                          me
                        )
                      }>
                      Create New Rental Application
                    </Button>
                    <RentalApplications
                      propertyId={id}
                      property={this.props.property}
                      me={me}
                      openRentalAppModal={rentalData => {
                        this.setState({
                          modalIsOpen: true,
                          applicationData: rentalData,
                        })
                      }}
                    />
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
