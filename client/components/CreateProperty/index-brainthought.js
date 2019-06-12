import React, { Component } from "react"
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
import LocationPicker from "../LocationPicker/index-class-component"
import ImagePicker from "../ImagePicker/index"
import DragDropUploader from "../DragDropUploader/index"
import { adopt } from "react-adopt"
import User from "../User/index"
import MultiSelectChip from "../Inputs/MultiSelectChip"
import SelectOption from "../Inputs/SelectOption"
import { INDOOR_FEATURES_CONF } from "../../lib/configs/indoorFeaturesConf"
import { OUTDOOR_FEATURES_CONF } from "../../lib/configs/outdoorFeaturesConf"
import { PROPERTY_TYPES_CONF } from "../../lib/configs/propertyTypesConf"
import moment from "moment"

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
    rent: 0.0,
    moveInDate: moment().format(),
    images: [],
    indoorFeatures: [],
    outdoorFeatures: [],
    carportSpaces: 1,
    garageSpaces: 5,
    offStreetSpaces: 2,
  }
  const [type, setType] = useState("HOUSE")
  const [location, setLocation] = useState("HOUSE")
  const [locationLat, setLocationLat] = useState("HOUSE")
  const [locationLng, setLocationLng] = useState("HOUSE")
  const [rooms, setRooms] = useState("HOUSE")
  const [moveInDate, setMoveInDate] = useState("HOUSE")
  const [images, setImages] = useState("HOUSE")
  const [indoorFeatures, setIndooreatures] = useState("HOUSE")
  const [outdoorFeatures, setType] = useState("HOUSE")
  const [carportSpaces, setType] = useState("HOUSE")
  const [garageSpaces, setType] = useState("HOUSE")
  const [offStreetSpaces, setType] = useState("HOUSE")

  const saveToState = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  const _createProperty = async createProperty => {
    const res = await createProperty()
    toast.success(<p>New Property Created</p>)
    this.setState({
      ...this.defaultState,
    })
  }

  const _propertyVariables = ({ me }) => {
    const theFiles = this.state.images
      .filter(f => f.type === "rawImage")
      .map(file => file.data.raw)
    const data = {
      data: {
        type: this.state.type,
        rent: parseFloat(this.state.rent),
        location: this.state.location,
        locationLat: this.state.locationLat,
        locationLng: this.state.locationLng,
        rooms: parseInt(this.state.rooms),
        moveInDate: "2015-03-25T12:00:00-06:30",
        carportSpaces: 1,
        garageSpaces: 5,
        offStreetSpaces: 2,
        outdoorFeatures: {
          set: this.state.outdoorFeatures,
        },
        indoorFeatures: {
          set: this.state.indoorFeatures,
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
            ...this.state.images
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
      },
      files: theFiles,
    }
    return data
  }

  const _renderImages = urls =>
    urls.map((url, i) => <img src={url} height="100" width="100" />)

  const removeImageFromState = idx => {
    let images = this.state.images
    images.splice(idx, 1)
    this.setState({
      images: images,
    })
  }
  const setFileInState = file => {
    const files = this.state.images
    files.push({ type: "rawImage", data: file })

    this.setState({
      images: files,
    })
  }
  const _canSubmit = () => {
    const { location, locationLat, locationLng } = this.state
    if (location.length < 1) {
      return false
    }
    return true
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
                        locationLat: data.lat,
                        locationLng: data.lng,
                        location: data.desc,
                        // below is for google images. These seem to remove the temporary url after some time
                        // images: data.images.map(url => {
                        //   return { type: "googleImage", data: url }
                        // }),
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
                    value={this.state.location}
                    onChange={this.saveToState}
                  />
                  <TextInput
                    id="latitude"
                    label="Latitude"
                    disabled={true}
                    fullWidth={true}
                    type="text"
                    name="locationLat"
                    value={this.state.locationLat}
                    onChange={this.saveToState}
                  />
                  <TextInput
                    id="longitude"
                    label="Longitude"
                    disabled={true}
                    fullWidth={true}
                    type="text"
                    name="locationLng"
                    value={this.state.locationLng}
                    onChange={this.saveToState}
                  />

                  <SelectOption
                    label="Type"
                    name="type"
                    value={this.state.type}
                    options={PROPERTY_TYPES_CONF}
                    handleChange={this.saveToState}
                  />
                  <TextInput
                    id="headline"
                    label="Headline for property advertisement"
                    fullWidth={true}
                    name="headline"
                    value={this.state.headline}
                    onChange={this.saveToState}
                  />
                  <MultiSelectChip
                    values={this.state.indoorFeatures}
                    options={INDOOR_FEATURES_CONF}
                    label="Indoor Feature"
                    handleChange={value =>
                      this.setState({ indoorFeatures: value })
                    }
                    removeItem={v => {
                      console.log("Re3move enum value from array ", v)
                      const indoorFeatures = this.state.indoorFeatures
                      const featureIdx = indoorFeatures.findIndex(
                        feature => feature === v
                      )
                      indoorFeatures.splice(featureIdx, 1)
                      this.setState({
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
                    value={this.state.rooms}
                    onChange={this.saveToState}
                  />
                  <TextInput
                    id="bathRooms"
                    label="Number of Bath Rooms"
                    fullWidth={true}
                    type="number"
                    name="bathRooms"
                    value={this.state.bathRooms}
                    onChange={this.saveToState}
                  />
                  <MultiSelectChip
                    values={this.state.outdoorFeatures}
                    options={OUTDOOR_FEATURES_CONF}
                    label="Outdoor Feature"
                    handleChange={value =>
                      this.setState({ outdoorFeatures: value })
                    }
                    removeItem={v => {
                      console.log("Re3move enum value from array ", v)
                      const outdoorFeatures = this.state.outdoorFeatures
                      const featureIdx = outdoorFeatures.findIndex(
                        feature => feature === v
                      )
                      outdoorFeatures.splice(featureIdx, 1)
                      this.setState({
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
                    value={this.state.garageSpaces}
                    onChange={this.saveToState}
                  />
                  <TextInput
                    id="carportSpaces"
                    label="Number of car port spaces"
                    fullWidth={true}
                    type="number"
                    name="carportSpaces"
                    value={this.state.carportSpaces}
                    onChange={this.saveToState}
                  />
                  <TextInput
                    id="offStreetSpaces"
                    label="Number of off street spaces"
                    fullWidth={true}
                    type="number"
                    name="offStreetSpaces"
                    value={this.state.offStreetSpaces}
                    onChange={this.saveToState}
                  />
                  <DateInput
                    // value={"2015-03-25T12:00:00-06:30"}
                    value={this.state.moveInDate}
                    onChange={date => this.setState({ moveInDate: date })}
                  />
                  <TextInput
                    id="rent"
                    label="Rent"
                    fullWidth={true}
                    type="number"
                    name="rent"
                    value={this.state.rent}
                    onChange={this.saveToState}
                  />
                  <ImagePicker
                    images={this.state.images}
                    remove={idx => this.removeImageFromState(idx)}
                  />
                  <DragDropUploader
                    disabled={loading}
                    multiple={true}
                    types={["image"]}
                    extensions={[".jpg", ".png"]}
                    receiveFile={file => this.setFileInState(file)}
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
