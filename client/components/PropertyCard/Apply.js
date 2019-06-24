import React, { useState, useEffect } from "react"
import { Mutation } from "react-apollo"
import { useSubscription, useMutation, useQuery } from "react-apollo-hooks"
import { CREATE_RENTAL_APPLICATION } from "../../mutation/index"
import {
  RENTAL_APPLICATIONS_QUERY,
  CURRENT_USER_QUERY,
} from "../../query/index"

import { adopt } from "react-adopt"
import User from "../User/index"
import RentalApplications from "./RentalApplications"
import Button from "@material-ui/core/Button"
import Error from "../ErrorMessage/index"
import SuperLogin from "../SuperLogin"
import ChangeRouteButton from "../Routes/ChangeRouteButton"
import Modal from "../Modal/index"
import RentalApplicationStepperComponent from "../RentalApplicationStepper/index"
import Typography from "@material-ui/core/Typography"

const Apply = props => {
  const user = useQuery(CURRENT_USER_QUERY)
  const me = user.data ? user.data.me : null
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [applicationData, setApplicationData] = useState({})
  // useEffect(() => {}, [modalIsOpen])
  // const _apply = async createRentalApplication => {
  //   const res = await createRentalApplication()
  // }

  const [createApplication, createApplicationProps] = useMutation(
    CREATE_RENTAL_APPLICATION,
    {
      variables: {
        data: {
          stage: "INITIALIZING",
          visibility: "PRIVATE",
          title: "Jon Does Application",
          finalised: false,
          property: {
            connect: {
              id: props.property.id,
            },
          },
          owner: {
            connect: {
              id: me !== null ? me.id : null,
            },
          },
        },
      },
      update: (cache, payload) => {
        try {
          const variables = {
            where: {
              property: {
                id: props.property.id,
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
          data.rentalApplications.push({
            ...payload.data.createRentalApplication,
          })
          cache.writeQuery({
            query: RENTAL_APPLICATIONS_QUERY,
            data,
            variables: variables,
          })
        } catch (e) {
        } finally {
          setApplicationData(payload.data.createRentalApplication)
          setModalIsOpen(true)
        }
      },
    }
  )

  console.log("me => ", me)

  if (!me)
    return (
      <div style={{ maxWidth: "100vw", padding: "16px" }}>
        <h4>You need to sign in or up to apply</h4>
        {/* <SuperLogin /> */}
        <ChangeRouteButton
          route="/login"
          title="Login / Signup"
          variant="contained"
          color="secondary"
        />
      </div>
    )

  return (
    <div>
      <div style={{ padding: "16px" }}>
        <Error error={createApplicationProps.error} />
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
        <Typography variant="p" component="p" paragraph="true">
          You may create one application per property, if you have already
          created one, you will be editing the application you originally
          created. You can apply to other peoples applications
        </Typography>
        <Button
          disabled={createApplicationProps.loading}
          color="primary"
          variant="outlined"
          style={{ padding: "16px", margin: "0 0 16px 0" }}
          onClick={() => createApplication()}>
          Create / Update Rental Application
        </Button>
      </div>
      <RentalApplications
        propertyId={props.property.id}
        property={props.property}
        me={me}
        openRentalAppModal={rentalData => {
          setModalIsOpen(true)
          setApplicationData(rentalData)
        }}
      />
    </div>
  )
}

export default Apply
