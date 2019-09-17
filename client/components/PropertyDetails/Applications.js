import React, { Component } from "react"
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks"
import { RENTAL_APPLICATIONS_QUERY } from "../../query/index"
import { ACCEPT_RENTAL_APPLICATION_MUTATION } from "../../mutation/acceptRentalApplication"
import { RENTAL_APPLICATION_CREATED_SUBSCRIPTION } from "../../subscriptions/RentalApplicationCreatedSub"
import { RENTAL_APPLICATION_UPDATED_SUBSCRIPTION } from "../../subscriptions/RentalApplicationUpdatedSub"
import PropertyPendingRentalApplicationsSub from "../SubscriptionComponents/PropertyPendingRentalApplicationsSub"
import Card from "@material-ui/core/Card"
import ExpansionPanel from "../../styles/ExpansionPanel"
import ExpansionPanelSummary from "../../styles/ExpansionPanelSummary"
// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import DialogPopup from "../DialogPopup/index"
// import Typography from "@material-ui/core/Typography"
import Typography from "../../styles/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
//icons
import PersonIcon from "@material-ui/icons/Person"
import PersonAddIcon from "@material-ui/icons/PersonAdd"
import PersonOutlineIcon from "@material-ui/icons/PersonOutline"

import StarIcon from "../../styles/icons/StarIcon"

import ApplicantDetails from "../ApplicantDetails/index"
import ApplicationCard from "./ApplicationCard"
import { Button } from "@material-ui/core"
import { ToastContainer, toast } from "react-toastify"

const AcceptApplication = ({ application, property }) => {
  // ToDo: Mutation Props
  const [acceptApplication, acceptApplicationProps] = useMutation(
    ACCEPT_RENTAL_APPLICATION_MUTATION,
    {
      // variables: {
      //   data: {
      //     applicationId: application.id,
      //     propertyId: property.id,
      //   },
      // },
      variables: {
        applicationId: application.id,
        propertyId: property.id,
      },
      update: (proxy, payload) => {},
      // optimisticResponse: {},
    }
  )
  return (
    <Button
      variant="outlined"
      onClick={() => {
        acceptApplication()
      }}>
      Accept application
    </Button>
  )
}

const DenyApplication = () => {
  return <Button variant="outlined">Deny application</Button>
}

// INITIALIZING
// PENDING
// DENIED
// ACCEPTED
const RentalApplications = props => {
  const { data, error, loading } = useQuery(RENTAL_APPLICATIONS_QUERY, {
    variables: {
      where: {
        property: {
          id: props.property.id,
        },
        // stage: "PENDING",
        stage_in: ["PENDING", "ACCEPTED"],
      },
    },
    suspend: false,
  })

  const applicationIds = loading
    ? []
    : data.rentalApplications.map(application => application.id)
  /**
   * JUST NOT USING FOR NOW
  useSubscription(RENTAL_APPLICATION_UPDATED_SUBSCRIPTION, {
    variables: {
      where: {
        mutation_in: "UPDATED",
        node: {
          stage_in: ["PENDING", "INITIALIZING", "DENIED", "ACCEPTED"],
          id_in: applicationIds,
        },
      },
    },
    onSubscriptionData: ({ client, subscriptionData }) => {
      console.log("Application is now in Pending mode => ", subscriptionData)
      toast.info(<h3>Application is now in Pending mode</h3>)
    },
    // ... rest options
  })
   */

  // useSubscription(RENTAL_APPLICATION_CREATED_SUBSCRIPTION, {
  //   // variables: {
  //   //   // ...
  //   // },
  //   onSubscriptionData: ({ client, subscriptionData }) => {
  //     const applications = client.readQuery({
  //       query: RENTAL_APPLICATIONS_QUERY,
  //       variables: {
  //         where: {
  //           property: {
  //             id: props.property.id,
  //           },
  //         },
  //       },
  //     })
  //     applications.rentalApplications.push(
  //       subscriptionData.data.rentalApplicationCreatedSub.node
  //     )
  //     client.writeQuery({
  //       query: RENTAL_APPLICATIONS_QUERY,
  //       data: {
  //         ...applications.rentalApplications,
  //       },
  //       variables: {
  //         where: {
  //           property: {
  //             id: props.property.id,
  //           },
  //         },
  //       },
  //     })
  //   },
  //   // ... rest options
  // })

  if (loading) {
    return <div>fetching applications please wait....</div>
  }
  if (error) {
    return <div>Error! {error.message}</div>
  }
  return (
    <div>
      <h1>I am the Applications details component</h1>
      {/* <PropertyPendingRentalApplicationsSub property={props.property} /> */}
      <div>
        <h2>This area is to perform actions for potential applications e.g.</h2>
        <ul>
          <li>Send email and notification to applicants about a viewing</li>
        </ul>
      </div>

      {data.rentalApplications.map((application, i) => {
        return (
          <ApplicationCard
            application={application}
            property={props.property}
          />
        )
      })}
    </div>
  )
}

export default RentalApplications
