import React, { Component, useState, useEffect } from "react"
import { useMutation } from "@apollo/react-hooks"
import Error from "../ErrorMessage/index"
import { isEmpty } from "ramda"
import { toast } from "react-toastify"
import {
  ACCEPT_RENTAL_APPLICATION_MUTATION,
  CREATE_PROPERTY_LEASE_MUTATION,
} from "../../mutation/index"
import { useMatchFetch } from "../Effects/useMatchEffect"

import { Button } from "@material-ui/core"
import ChangeRouteButton from "../Routes/ChangeRouteButton"

// export const Example = () => {
//   const render = useMatchFetch("https://swapi.co/api/people/1/?format=json")

//   return render({
//     pending: () => <div>Loading</div>,
//     error: err => <div>{err.toString()}</div>,
//     data: data => <pre>{JSON.stringify(data, null, 2)}</pre>,
//   })
// }

// lessors: {
//   create: [
//     {
//       signed: false,
//       user: {
//         connect: {
//           id: "",
//         },
//       },
//     },
//   ],
// },
const createLessors = ids => {
  return ids.map(id => ({
    signed: false,
    user: {
      connect: {
        id: id,
      },
    },
  }))
}

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

  const tenantIds = application.applicants
    .filter(f => f.approved === true)
    .filter(f => f.completed === true)
    .map(tenant => tenant.user.id)

  // havnt done this yet...
  // const ownerIds = application
  const ownerId = application.owner.id

  // 2. extract the owners from the application.
  // 3. then get the data
  // const createNewLease = useMutation(CREATE_PROPERTY_LEASE_MUTATION)
  // ToDo: Mutation Props
  const [acceptApplicationMutation, { data, loading, error }] = useMutation(
    ACCEPT_RENTAL_APPLICATION_MUTATION,
    {
      variables: {
        applicationId: application.id,
        propertyId: property.id,
      },
      update: (proxy, payload) => {
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
  // ToDo: Mutation Props
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
          moveInDate: property.moveInDate,
          expiryDate: property.expiryDate,
          location: property.location,
          locationLat: property.locationLat,
          locationLng: property.locationLng,
          finalised: false,
          property: {
            connect: {
              id: property.id,
            },
          },
          outdoorFeatures: {
            set: property.outdoorFeatures,
          },
          indoorFeatures: {
            set: property.indoorFeatures,
          },
          lessors: {
            create: createLessors([ownerId]),
          },
          lessees: {
            create: createLessors(tenantIds),
          },
        },
      },
      update: (proxy, payload) => {
        const newLease = payload.data.createPropertyLease
        // Once application is accepted we can create a newLease
        toast.success(
          <div>
            <p>
              New Lease Created Id: {newLease.id} location: {newLease.location}
              Complete The Lease Here Todo: route to new lease
            </p>
            <ChangeRouteButton
              title="Manage & Sign Lease"
              route="/my/lease"
              query={{ id: newLease.id }}
            />
          </div>,
          {
            autoClose: 15000,
          }
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
      {/* <Example /> */}
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
