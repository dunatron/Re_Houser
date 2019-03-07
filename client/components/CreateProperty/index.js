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

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($data: PropertyCreateInput!, $files: [Upload]) {
    createProperty(data: $data, files: $files) {
      id
    }
  }
`

class Signup extends Component {
  state = {
    location: "",
    locationLat: "",
    locationLng: "",
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
      location: "",
    })
  }

  _propertyVariables = () => {
    return {
      data: {
        rent: 45.65,
        location: this.state.location,
        locationLat: 4512.0125,
        locationLon: 125454,
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
      },
    }
  }
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

              <FabButton
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
