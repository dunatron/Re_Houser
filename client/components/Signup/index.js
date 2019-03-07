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
  mutation SIGNUP_MUTATION(
    $email: String!
    $firstName: String!
    $lastName: String!
    $phone: String!
    $password: String!
  ) {
    signup(
      email: $email
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      password: $password
    ) {
      id
      email
      firstName
      lastName
      phone
    }
  }
`

class Signup extends Component {
  state = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
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
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
    })
  }
  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
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
                id="email"
                label="Email"
                fullWidth={true}
                type="email"
                name="email"
                placeholder="please enter your email"
                value={this.state.email}
                onChange={this.saveToState}
              />
              <TextInput
                id="name"
                label="First Name"
                fullWidth={true}
                type="text"
                name="firstName"
                placeholder="please enter your firstname"
                value={this.state.firstName}
                onChange={this.saveToState}
              />
              <TextInput
                id="name"
                label="Last Name"
                fullWidth={true}
                type="text"
                name="lastName"
                placeholder="please enter your lastname"
                value={this.state.lastName}
                onChange={this.saveToState}
              />
              <TextInput
                id="name"
                label="Phone Number"
                fullWidth={true}
                type="text"
                name="phone"
                placeholder="please enter your phone number"
                value={this.state.phone}
                onChange={this.saveToState}
              />
              <TextInput
                id="password"
                label="Password"
                fullWidth={true}
                type="password"
                name="password"
                placeholder="password"
                value={this.state.password}
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
