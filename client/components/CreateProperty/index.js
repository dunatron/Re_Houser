import React, { Component } from "react"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"
import Form from "../../styles/Form"
import Error from "../ErrorMessage/index"
import { CURRENT_USER_QUERY } from "../User/index"
import { openSnackbar } from "../Notifier/index"
import FabButton from "../../styles/FabButton"
import NavigationIcon from "@material-ui/icons/Navigation"
import TextInput from "../../styles/TextInput"
import LocationPicker from "../LocationPicker/index"
import ImagePicker from "../ImagePicker/index"
import DragDropUploader from "../DragDropUploader/index"

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($data: PropertyCreateInput!, $files: [Upload]) {
    createProperty(data: $data, files: $files) {
      id
    }
  }
`

class Signup extends Component {
  defaultState = {
    location: "",
    locationLat: "",
    locationLng: "",
    rooms: 0,
    rent: 0.0,
    images: [],
  }
  state = {
    ...this.defaultState,
  }
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  _createProperty = async createProperty => {
    const res = await createProperty()
    openSnackbar({
      message: `New Property Created`,
      duration: 6000,
    })
    this.setState({
      ...this.defaultState,
    })
  }

  _propertyVariables = () => {
    const data = {
      data: {
        rent: 45.65,
        location: "A test location",
        locationLat: 4512.0125,
        locationLng: 125454,
        rooms: 6,
        owners: {
          connect: {
            id: "cjsy33qhd7aax0b35l0igfy64",
          },
        },
        onTheMarket: false,
        creator: {
          connect: {
            id: "cjsy33qhd7aax0b35l0igfy64",
          },
        },
        images: {
          create: [
            ...this.state.images
              .filter(img => img.type !== "rawImage")
              .map(img => {
                return {
                  filename: "Test file name",
                  mimetype: "MIMETYPE",
                  encoding: "encoding",
                  url: "test url",
                }
              }),
          ],
        },
        // images: [
        //   ...this.state.images
        //     .filter(img => img.type !== "rawImage")
        //     .map(img => {
        //       return {
        //         create: {
        //           filename: "Test file name",
        //           mimetype: "MIMETYPE",
        //           encoding: "encoding",
        //           url: "test url",
        //         },
        //       }
        //     }),
        //   // So do a map here and filter out "rawImage" images
        //   // create: {
        //   //   filename: "Test file name",
        //   //   mimetype: "MIMETYPE",
        //   //   encoding: "encoding",
        //   //   url: "test url",
        //   // },
        // ],
      },
    }
    console.log("Property Vars => ", data)
    return data
  }

  _renderImages = urls =>
    urls.map((url, i) => <img src={url} height="100" width="100" />)

  removeImageFromState = idx => {
    let images = this.state.images
    images.splice(idx, 1)
    this.setState({
      images: images,
    })
  }
  setFileInState = file => {
    const files = this.state.images
    files.push({ type: "rawImage", data: file })

    this.setState({
      images: files,
    })
  }
  _canSubmit = () => {
    const { location, locationLat, locationLng } = this.state
    if (location.length < 1) {
      return false
    }
    return true
  }
  // Make most of these Pure Components please
  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this._propertyVariables()}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
        {(createProperty, { error, loading }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault()
              // await signup()
              this._createProperty(createProperty)
            }}>
            <fieldset disabled={loading} aria-busy={loading}>
              <Error error={error} />

              <LocationPicker
                selection={data =>
                  this.setState({
                    locationLat: data.lat,
                    locationLng: data.lng,
                    location: data.desc,
                    images: data.images.map(url => {
                      return { type: "googleImage", data: url }
                    }),
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
                disabled={!this._canSubmit()}
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
  }
}

export default Signup
export { SIGNUP_MUTATION }
