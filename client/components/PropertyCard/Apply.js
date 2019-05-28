import React, { useState, useEffect } from "react"
import { Mutation } from "react-apollo"
import { useSubscription } from "react-apollo-hooks"
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

const Apply = props => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [applicationData, setApplicationData] = useState({})
  useEffect(() => {
    console.log("THE MODAL STATE HAS CHANGED!!!!")
  }, [modalIsOpen])
  const _apply = async createRentalApplication => {
    const res = await createRentalApplication()
  }
  const _createRentalApplication = async (createRentalApplication, me) => {
    const { id, rentalApplications } = props.property
    const res = await createRentalApplication({
      variables: {
        data: {
          stage: "INITIALIZING",
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
  const _variables = () => {}
  const update = (cache, payload) => {
    const { id } = props.property
    const variables = {
      where: {
        property: {
          id: id,
        },
      },
    }
    const data = cache.readQuery({
      query: RENTAL_APPLICATIONS_QUERY,
      variables: variables,
    })
    const applicationId = payload.data.createRentalApplication.id
    const haveApplication = data.rentalApplications.find(
      application => application.id === applicationId
    )
    // return early as to not add to cache
    if (haveApplication) {
      return
    }
    data.rentalApplications.push({ ...payload.data.createRentalApplication })
    cache.writeQuery({
      query: RENTAL_APPLICATIONS_QUERY,
      data,
      variables: variables,
    })
  }
  const rentalApplicationStepper = async (createRentalApplication, me) => {
    console.log("rentalApplicationStepper Me => ", me)
    const application = await _createRentalApplication(
      createRentalApplication,
      me
    )
    setApplicationData(application.data.createRentalApplication)
    setModalIsOpen(true)
  }

  const { id, location } = props.property

  return (
    <Composed>
      {({ user, createRentalApplication }) => {
        const me = user.data.me
        if (!me)
          return (
            <div>
              <h4>You need to sign in or up to apply</h4>
              <SuperLogin />
            </div>
          )
        // if (!me) return <SuperLogin />
        return (
          <div>
            <Modal
              open={modalIsOpen}
              title={`Application for ${location}`}
              close={() => setModalIsOpen(false)}>
              <RentalApplicationStepperComponent
                property={props.property}
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

              update={update}>
              {(createRentalApplication, { error, loading }) => (
                <>
                  <Error error={error} />
                  <Button
                    disabled={loading}
                    color="primary"
                    variant="outlined"
                    style={{ padding: "16px", margin: "0 0 16px 0" }}
                    onClick={() =>
                      rentalApplicationStepper(createRentalApplication, me)
                    }>
                    Create New Rental Application
                  </Button>
                  <RentalApplications
                    propertyId={id}
                    property={props.property}
                    me={me}
                    // openRentalAppModal={rentalData => {
                    //   this.setState({
                    //     modalIsOpen: true,
                    //     applicationData: rentalData,
                    //   })
                    // }}
                    openRentalAppModal={rentalData => {
                      setModalIsOpen(true)
                      setApplicationData(rentalData)
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

export default Apply
