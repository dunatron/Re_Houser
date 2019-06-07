import React, { Component, useState, useEffect } from "react"
import { useMutation } from "react-apollo-hooks"
import Error from "../ErrorMessage/index"
import { isEmpty } from "ramda"
import { toast } from "react-toastify"
import {
  ACCEPT_RENTAL_APPLICATION_MUTATION,
  CREATE_PROPERTY_LEASE_MUTATION,
} from "../../mutation/index"

import { Button } from "@material-ui/core"

/**
 * This is actually going to be tied to createALeaseButton aswel as the acceptRentalApplication
 * When W
 * NOTE !IMPORTANT JEFFREY => time to get rid of the explicit mutations from ../../mutation and just doing local
 * gql queries. Not opposed to fragments so just spend a few hours looking int getting them working inl;ine here
 * gql is client first ensure they are all hand crafted on demand, I repeat, ditch ../../ n=mutationm, empahsize .../../fragments
 *
 * @param {*} param0
 */

// const ErrorSupplier = ({ errors }) => {
//   return errors.map(error => <Error error={error} />)
// }
const ErrorSupplier = ({ errors, tronM }) =>
  errors.map(error => <Error error={error} tronM={tronM} />)
const AcceptApplicationButton = ({ application, property }) => {
  // 1. extract the applicants from the application
  // application.

  console.log("accept application button application => ", application)
  console.log("accept application button property  => ", property)

  const tenantIds = application.applicants
    .filter(f => f.approved === true)
    .filter(f => f.completed === true)
    .map(tenant => tenant.id)

  // havnt done this yet...
  // const ownerIds = application
  const ownerId = application.owner.id

  console.log("tenantIds => ", tenantIds)

  // 2. extract the owners from the application.
  // 3. then get the data
  // const createNewLease = useMutation(CREATE_PROPERTY_LEASE_MUTATION)
  const [acceptApplicationMutation, { data, loading, error }] = useMutation(
    ACCEPT_RENTAL_APPLICATION_MUTATION,
    {
      variables: {
        applicationId: application.id,
        propertyId: property.id,
      },
      update: (proxy, payload) => {
        console.group("AcceptApplicationButton update ToDo")
        console.log("proxy => ", proxy)
        console.log("payload => ", payload)
        console.groupEnd()
        // Once application is accepted we can create a newLease
        if (payload.data.acceptRentalApplication.message) {
          toast(
            <div>
              <h1>Application Accepted</h1>
            </div>
          )
        }
      },
    }
  )
  const [createNewPropertyLease, newLeasePayload] = useMutation(
    CREATE_PROPERTY_LEASE_MUTATION,
    {
      variables: {
        data: {
          rooms: property.rooms,
          bathrooms: property.bathrooms,
          garageSpaces: property.garageSpaces,
          carportSpaces: property.carportSpaces,
          offStreetSpaces: property.offStreetSpaces,
          rent: property.rent,
          moveInDate: "2015-03-25T12:00:00-06:30",
          location: property.location,
          locationLat: property.locationLat,
          locationLng: property.locationLng,
          owners: {
            connect: [
              {
                id: "cjvaqrrbdt8u50b126ci5mgdm",
              },
            ],
          },
          outdoorFeatures: {
            set: ["OUTDOOR_SPA", "OUTDOOR_ENTERTAINMENT"],
          },
          indoorFeatures: {
            set: ["AIR_CONDITIONING", "FURNISHED", "DISHWASHER"],
          },
          // tenants: {
          //   connect: [],
          // },
          tenants: {
            connect: tenantIds.map(tenantId => ({ id: tenantId })),
          },
        },
      },
      update: (proxy, payload) => {
        console.group("AcceptApplicationButton update ToDo")
        console.log("proxy => ", proxy)
        console.log("payload => ", payload)
        console.groupEnd()
        const newLease = payload.data.createPropertyLease
        // Once application is accepted we can create a newLease
        toast.success(
          <div>
            <p>
              New Lease Created Id: {newLease.id} location: {newLease.location}
              Complete The Lease Here Todo: route to new lease
            </p>
          </div>
        )
      },
    }
  )
  return (
    <>
      <ErrorSupplier
        errors={[error, newLeasePayload.error]}
        tronM="Acccepting applicatiion failed"
      />
      <Button
        variant="outlined"
        onClick={() => {
          acceptApplicationMutation()
          createNewPropertyLease()
          // acceptApplicationMutation2()
          // createNewPropertyLease()
        }}>
        Accept application
      </Button>
    </>
  )
}

export default AcceptApplicationButton
