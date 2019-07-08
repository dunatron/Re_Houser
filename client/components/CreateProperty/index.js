import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"
import Form from "../../styles/Form"
import Error from "../ErrorMessage/index"
import { CURRENT_USER_QUERY } from "../User/index"
// import { OWNER_PROPERTIES_QUERY } from "../OwnerProperties/index"
import { PROPERTIES_QUERY, OWNER_PROPERTIES_QUERY } from "../../query/index"
import { CREATE_PROPERTY_MUTATION } from "../../mutation/index"
import FabButton from "../../styles/FabButton"
import NavigationIcon from "@material-ui/icons/Navigation"
import TextInput from "../../styles/TextInput"
import DateInput from "../Inputs/DateInput"
import LocationPicker from "../LocationPicker/index"
import ImagePicker from "../ImagePicker"
import DragDropUploader from "../DragDropUploader/index"
import { adopt } from "react-adopt"
import User from "../User/index"
import MultiSelectChip from "../Inputs/MultiSelectChip"
import SelectOption from "../Inputs/SelectOption"
import { INDOOR_FEATURES_CONF } from "../../lib/configs/indoorFeaturesConf"
import { OUTDOOR_FEATURES_CONF } from "../../lib/configs/outdoorFeaturesConf"
import { PROPERTY_TYPES_CONF } from "../../lib/configs/propertyTypesConf"
import moment from "moment"
import ChangeRouteButton from "../Routes/ChangeRouteButton"
import LeaseLength from "../LeaseManager/LeaseLengthInfo"

import AccommodationCreator from "./AccommodationCreator"

// const CREATE_PROPERTY_MUTATION = gql`
//   mutation CREATE_PROPERTY_MUTATION(
//     $data: PropertyCreateInput!
//     $files: [Upload]
//   ) {
//     createProperty(data: $data, files: $files) {
//       id
//     }
//   }
// `

/* eslint-disable */
const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  createProperty: ({ render }) => (
    <Mutation mutation={CREATE_PROPERTY_MUTATION}>{render}</Mutation>
  ),
})
/* eslint-enable */

const CreateProperty = () => {
  const defaultState = {
    type: "HOUSE",
    location: "",
    locationLat: "",
    locationLng: "",
    rooms: 0,
    accommodation: [],
    rent: 0.0,
    moveInDate: moment().format(),
    expiryDate: moment()
      .add(12, "months")
      .format(),
    images: [],
    indoorFeatures: [],
    outdoorFeatures: [],
    carportSpaces: 1,
    garageSpaces: 5,
    offStreetSpaces: 2,
    isLeased: false,
  }
  const [state, setState] = useState(defaultState)
  const saveToState = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const _createProperty = async createProperty => {
    const res = await createProperty()
    // offer route to this property
    toast.success(
      <div>
        <p>New Property Created</p>
        <ChangeRouteButton
          title="Go to property"
          route="/my/property"
          query={{ id: res.data.createProperty.id }}
        />
      </div>
    )
    setState({
      ...defaultState,
    })
  }

  const _propertyVariables = ({ me }) => {
    const theFiles = state.images
      .filter(f => f.type === "rawImage")
      .map(file => file.data.raw)
    const data = {
      data: {
        type: state.type,
        rent: parseFloat(state.rent),
        location: state.location,
        locationLat: state.locationLat,
        locationLng: state.locationLng,
        rooms: parseInt(state.rooms),
        moveInDate: state.moveInDate,
        expiryDate: state.expiryDate,
        carportSpaces: parseInt(state.carportSpaces),
        garageSpaces: parseInt(state.garageSpaces),
        offStreetSpaces: parseInt(state.offStreetSpaces),
        outdoorFeatures: {
          set: state.outdoorFeatures,
        },
        indoorFeatures: {
          set: state.indoorFeatures,
        },
        owners: {
          connect: {
            id: me.id,
          },
        },
        onTheMarket: false,
        creator: {
          connect: {
            id: me.id,
          },
        },
        images: {
          create: [
            ...state.images
              .filter(img => img.type !== "rawImage")
              .map((img, i) => {
                return {
                  filename: `${this.state.location}_${i}`,
                  mimetype: "MIMETYPE",
                  encoding: "encoding",
                  url: img.data,
                }
              }),
          ],
        },
        accommodation: {
          create: [...state.accommodation],
        },
      },
      files: theFiles,
    }
    return data
  }

  const _renderImages = urls =>
    urls.map((url, i) => <img src={url} height="100" width="100" />)

  const removeImageFromState = idx => {
    let images = state.images
    images.splice(idx, 1)
    setState({
      ...state,
      images: images,
    })
  }
  const setFileInState = file => {
    const files = state.images
    files.push({ type: "rawImage", data: file })

    setState({
      ...state,
      images: files,
    })
  }
  const _canSubmit = () => {
    const { location, locationLat, locationLng } = state
    if (location.length < 1) {
      return false
    }
    return true
  }
  const addAccommodation = ({ accommodation }) => {
    const updatedAccommodation = [...state.accommodation, accommodation]
    setState({
      ...state,
      accommodation: [...state.accommodation, accommodation],
    })
  }
  const updateAccommodation = props => {
    console.log("Im gonna have to lead ya => ", props)
    const updatedAccommodation = [...state.accommodation]
    updatedAccommodation[props.updateIndex] = props.accommodation
    setState({
      ...state,
      accommodation: updatedAccommodation,
    })
  }

  const removeAccommodation = ({ removeIndex }) => {
    const updatedAccommodation = [...state.accommodation]
    updatedAccommodation.splice(removeIndex, 1)
    setState({
      ...state,
      accommodation: updatedAccommodation,
    })
  }

  // Make most of these Pure Components please

  return (
    <Composed>
      {({ user, toggleCart, localState }) => {
        const me = user.data.me
        if (!me) return <h1>No User</h1>
        return (
          <Mutation
            mutation={CREATE_PROPERTY_MUTATION}
            variables={_propertyVariables({ me })}
            refetchQueries={[
              { query: PROPERTIES_QUERY },
              { query: OWNER_PROPERTIES_QUERY },
            ]}>
            {(createProperty, { error, loading }) => (
              <Form
                method="post"
                onSubmit={async e => {
                  e.preventDefault()
                  _createProperty(createProperty)
                }}>
                <fieldset disabled={loading} aria-busy={loading}>
                  <Error error={error} />

                  <LocationPicker
                    selection={data =>
                      setState({
                        ...state,
                        locationLat: data.lat,
                        locationLng: data.lng,
                        location: data.desc,
                      })
                    }
                  />

                  <TextInput
                    id="location"
                    label="location"
                    disabled={true}
                    fullWidth={true}
                    type="text"
                    name="location"
                    placeholder="please enter your location"
                    value={state.location}
                    onChange={saveToState}
                  />
                  <TextInput
                    id="latitude"
                    label="Latitude"
                    disabled={true}
                    fullWidth={true}
                    type="text"
                    name="locationLat"
                    value={state.locationLat}
                    onChange={saveToState}
                  />
                  <TextInput
                    id="longitude"
                    label="Longitude"
                    disabled={true}
                    fullWidth={true}
                    type="text"
                    name="locationLng"
                    value={state.locationLng}
                    onChange={saveToState}
                  />

                  <SelectOption
                    label="Type"
                    name="type"
                    value={state.type}
                    options={PROPERTY_TYPES_CONF}
                    handleChange={saveToState}
                  />
                  <TextInput
                    id="headline"
                    label="Headline for property advertisement"
                    fullWidth={true}
                    name="headline"
                    value={state.headline}
                    onChange={saveToState}
                  />
                  <MultiSelectChip
                    values={state.indoorFeatures}
                    options={INDOOR_FEATURES_CONF}
                    label="Indoor Feature"
                    handleChange={value =>
                      setState({ ...state, indoorFeatures: value })
                    }
                    removeItem={v => {
                      const indoorFeatures = state.indoorFeatures
                      const featureIdx = indoorFeatures.findIndex(
                        feature => feature === v
                      )
                      indoorFeatures.splice(featureIdx, 1)
                      setState({
                        ...state,
                        indoorFeatures: indoorFeatures,
                      })
                    }}
                  />
                  <TextInput
                    id="rooms"
                    label="Room Number"
                    fullWidth={true}
                    type="number"
                    name="rooms"
                    value={state.rooms}
                    onChange={saveToState}
                  />
                  <AccommodationCreator
                    accommodation={state.accommodation}
                    add={accommodation => addAccommodation(accommodation)}
                    update={data => updateAccommodation(data)}
                    duplicate={accommodation => addAccommodation(accommodation)}
                    remove={res => removeAccommodation(res)}
                  />
                  <TextInput
                    id="bathRooms"
                    label="Number of Bath Rooms"
                    fullWidth={true}
                    type="number"
                    name="bathRooms"
                    value={state.bathRooms}
                    onChange={saveToState}
                  />
                  <MultiSelectChip
                    values={state.outdoorFeatures}
                    options={OUTDOOR_FEATURES_CONF}
                    label="Outdoor Feature"
                    handleChange={value =>
                      setState({ ...state, outdoorFeatures: value })
                    }
                    removeItem={v => {
                      const outdoorFeatures = state.outdoorFeatures
                      const featureIdx = outdoorFeatures.findIndex(
                        feature => feature === v
                      )
                      outdoorFeatures.splice(featureIdx, 1)
                      setState({
                        ...state,
                        outdoorFeatures: outdoorFeatures,
                      })
                    }}
                  />
                  <TextInput
                    id="garageSpaces"
                    label="Number of Garage spaces"
                    fullWidth={true}
                    type="number"
                    name="garageSpaces"
                    value={state.garageSpaces}
                    onChange={saveToState}
                  />
                  <TextInput
                    id="carportSpaces"
                    label="Number of car port spaces"
                    fullWidth={true}
                    type="number"
                    name="carportSpaces"
                    value={state.carportSpaces}
                    onChange={saveToState}
                  />
                  <TextInput
                    id="offStreetSpaces"
                    label="Number of off street spaces"
                    fullWidth={true}
                    type="number"
                    name="offStreetSpaces"
                    value={state.offStreetSpaces}
                    onChange={saveToState}
                  />
                  <TextInput
                    id="rent"
                    label="Rent"
                    fullWidth={true}
                    type="number"
                    name="rent"
                    value={state.rent}
                    onChange={saveToState}
                  />
                  <DateInput
                    // value={"2015-03-25T12:00:00-06:30"}
                    id="moveInDate"
                    label="Move In Date"
                    value={state.moveInDate}
                    onChange={date => setState({ ...state, moveInDate: date })}
                  />
                  <DateInput
                    // value={"2015-03-25T12:00:00-06:30"}
                    id="expiryDate"
                    label="Expiry Date"
                    value={state.expiryDate}
                    onChange={date => setState({ ...state, expiryDate: date })}
                  />
                  <LeaseLength
                    moveInDate={state.moveInDate}
                    expiryDate={state.expiryDate}
                  />

                  <ImagePicker
                    images={state.images}
                    remove={idx => removeImageFromState(idx)}
                  />
                  <DragDropUploader
                    disabled={loading}
                    multiple={true}
                    types={["image"]}
                    extensions={[".jpg", ".png"]}
                    receiveFile={file => setFileInState(file)}
                  />

                  {/* {this._renderImages(this.state.images)} */}

                  <FabButton
                    // disabled={!this._canSubmit()}
                    type="submit"
                    variant="extended"
                    color="primary"
                    aria-label="Add"
                    style={{ minWidth: 160 }}>
                    <NavigationIcon style={{ marginRight: 5 }} />
                    Add Housing
                  </FabButton>
                </fieldset>
              </Form>
            )}
          </Mutation>
        )
      }}
    </Composed>
  )
}

export default CreateProperty
export { CREATE_PROPERTY_MUTATION }
