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

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($data: PropertyCreateInput!, $files: [Upload!]!) {
    createProperty(data: $data, files: $files) {
      id
    }
  }
`

class Signup extends Component {
  state = {
    location: "",
  }
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  _signUp = async signup => {
    const res = await signup()
    openSnackbar({
      message: `Welcome: ${res.data.signup.firstName} ${
        res.data.signup.lastName
      }`,
      duration: 6000,
    })
    this.setState({
      location: "",
    })
  }

  _propertyVariables = () => {
    return {}
  }
  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this._propertyVariables()}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
        {(signup, { error, loading }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault()
              // await signup()
              this._signUp(signup)
            }}>
            <fieldset disabled={loading} aria-busy={loading}>
              <Error error={error} />
              <TextInput
                id="location"
                label="location"
                fullWidth={true}
                type="location"
                name="location"
                placeholder="please enter your location"
                value={this.state.location}
                onChange={this.saveToState}
              />

              <FabButton
                type="submit"
                variant="extended"
                color="primary"
                aria-label="Add"
                style={{ minWidth: 160 }}>
                <NavigationIcon style={{ marginRight: 5 }} />
                Sign Up
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
