import React, { Component, useState, useRef, useEffect } from "react"

import Map from "../Map/index"
import ImageSlider from "../ImageSlider/index"
import DetailItem from "../PropertyCard/DetailItem"
import IconButton from "@material-ui/core/IconButton"
//icons
import EditIcon from "../../styles/icons/EditIcon"
import MoreIcon from "../../styles/icons/MoreIcon"
import DetailsIcon from "../../styles/icons/DetailsIcon"
import CameraIcon from "../../styles/icons/CameraIcon"
// Update variable components ToDo: move to own file
import gql from "graphql-tag"
import { useMutation } from "react-apollo-hooks"
import InputModal from "../Modal/InputModal"
import TextInput from "../../styles/TextInput"
import Error from "../ErrorMessage/index"
import Button from "@material-ui/core/Button"
import { UPDATE_PROPERTY_MUTATION } from "../../mutation/index"
import { OWNER_PROPERTIES_QUERY } from "../../query/index"
import useKeyPress from "../../lib/useKeyPress"

const sanitizeInput = (type, value) => {
  if (type === "number") {
    return parseFloat(value)
  }
  return value
}

const UpdatePropertyVariableModal = ({
  propertyId,
  name,
  label,
  type = "text", // [color, date, datetime-local, email, month, number, range, search, text, time, url, checkbox, file, password]
  value = "",
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({})
  const [propertyValue, setPropertyValue] = useState(value)

  // const escapePress = useKeyPress("Escape")
  // if (escapePress === true) {
  //   console.log("escapePress ?? => ", escapePress)
  //   setModalIsOpen(false)
  // }

  function downHandler({ key }) {
    if (key === "Escape") {
      setModalIsOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler)
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler)
    }
  }, []) // Empty array ensures that effect is only run on mount and unmount

  const PROPERTY_SINGLE_PROPERTY_MUTATION = gql`
    mutation UPDATE_PROPERTY_MUTATION($id: ID!, $data: PropertyUpdateInput!) {
      updateProperty(id: $id, data: $data) {
        id
        ${name}
      }
    }
  `

  const updateProperty = useMutation(PROPERTY_SINGLE_PROPERTY_MUTATION, {
    variables: {
      id: propertyId,
      data: {
        [name]: sanitizeInput(type, propertyValue),
        // sff: "dfsfd", // test error. Need to get error out of network
      },
    },
    update: (proxy, payload) => {
      // // find out where the property prop is loaded from and update the cache
      const data = proxy.readQuery({ query: OWNER_PROPERTIES_QUERY })
      const updatedPropertyData = payload.data.updateProperty
      const allProperties = data.ownerProperties
      const idToSearchBy = updatedPropertyData.id
      const foundIndex = allProperties.findIndex(p => p.id === idToSearchBy)
      data.ownerProperties[foundIndex] = {
        ...data.ownerProperties[foundIndex],
        ...payload.data.updateProperty,
      }
      proxy.writeQuery({ query: OWNER_PROPERTIES_QUERY, data })
    },
    errorPolicy: "all",
    optimisticResponse: {
      __typename: "Mutation",
      updateProperty: {
        __typename: "Property",
        id: propertyId,
        [name]: sanitizeInput(type, propertyValue),
      },
    },
  })
  return (
    <div>
      <InputModal
        title={`Update ${label}`}
        open={modalIsOpen}
        close={() => setModalIsOpen(false)}>
        <form
          onSubmit={async e => {
            e.preventDefault()
            updateProperty()
            // setLoading(true)
            // const res = await updateProperty()
            // setLoading(false)
            setModalIsOpen(false)
          }}>
          {loading && <p>confirming on the server...</p>}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Error error={error} />

            <TextInput
              autoFocus="true"
              style={{ margin: 0, paddingRight: "16px" }}
              type={type}
              disabled={loading}
              label={label}
              value={propertyValue}
              onChange={e => setPropertyValue(e.target.value)}
            />

            <Button
              disabled={loading}
              onClick={() => updateProperty()}
              variant="outlined">
              Update
            </Button>
          </div>
        </form>
      </InputModal>
      <IconButton aria-label="Delete" onClick={() => setModalIsOpen(true)}>
        <EditIcon color="default" />
      </IconButton>
    </div>
  )
}

const Details = props => {
  const { property } = props

  return (
    <div>
      <h4>
        Note: Updating data here will not affect any current agreements. It is
        for new advertisements in the future or to update any info. In short
        changing rent will have no impact on current agreements
      </h4>
      <div style={{ display: "flex", alignItems: "center" }}>
        <DetailItem icon={<CameraIcon />} label="Rent" value={property.rent} />
        <UpdatePropertyVariableModal
          propertyId={property.id}
          name="rent"
          label="Rent"
          type="number"
          value={property.rent}
        />
      </div>
      <div>
        <DetailItem
          icon={<CameraIcon />}
          label="Rooms"
          value={property.rooms}
        />
        <UpdatePropertyVariableModal
          propertyId={property.id}
          name="rooms"
          label="Rooms"
          type="number"
          value={property.rooms}
        />
      </div>

      <ImageSlider images={property.images} />
      <Map
        center={{
          lat: property.locationLat,
          lng: property.locationLng,
        }}
      />
    </div>
  )
}

export default Details
