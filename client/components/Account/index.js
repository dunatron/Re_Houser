import React, { Component } from "react"
import { Mutation } from "react-apollo"
import User from "../User/index"
import { adopt } from "react-adopt"
import InputModal from "../Modal/InputModal"

import { UPDATE_USER_MUTATION } from "../../mutation/index"
// components
import TextInput from "../../styles/TextInput"
import Error from "../ErrorMessage/index"

const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  updateUser: ({ render }) => (
    <Mutation mutation={UPDATE_USER_MUTATION}>{render}</Mutation>
  ),
})

export default class index extends Component {
  state = {
    modalIsOpen: false,
    variable: "",
    variableVal: "",
  }
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  _updateUser = async updateUser => {
    const res = await updateUser({
      variables: {
        data: {
          [this.state.variable]: this.state.variableVal,
        },
      },
    })
    console.log("res => ", res)
  }
  closeModal() {
    this.setState({
      modalIsOpen: false,
    })
  }
  openModal() {
    this.setState({
      modalIsOpen: true,
    })
  }
  renderModalDetails = (me, updateUser) => {
    const { variable, variableVal } = this.state
    return (
      <div>
        <Mutation
          mutation={UPDATE_USER_MUTATION}
          // variables={this._variables()}
          update={this.update}>
          {(createRentalApplication, { error }) => (
            <>
              Variable : {variable}
              <TextInput
                value={variableVal}
                onChange={e => this.setState({ variableVal: e.target.value })}
              />
              <button onClick={() => this._updateUser(updateUser)}>
                Update Variable
              </button>
              <Error error={error} />
              <button
                color="primary"
                onClick={() =>
                  this._createRentalApplication(createRentalApplication, me)
                }>
                Create New Group Application
              </button>
            </>
          )}
        </Mutation>

        {/* <button
          onClick={() => {
            updateUser({
              variables: {
                data: {
                  [variable]: this.state.variableVal,
                },
              },
            })
          }}>
          Update Variable
        </button> */}
      </div>
    )
  }
  update = () => {}
  render() {
    const { modalIsOpen } = this.state
    return (
      <Composed>
        {({ user, updateUser }) => {
          const me = user.data.me
          return (
            <div>
              <h1>
                <InputModal open={modalIsOpen} close={() => this.closeModal()}>
                  {this.renderModalDetails(me, updateUser)}
                </InputModal>
                EMAIL :{me.email}
                <button
                  onClick={() =>
                    this.setState({
                      modalIsOpen: true,
                      variable: "email",
                      variableVal: me.email,
                    })
                  }>
                  EDIT
                </button>
              </h1>
              {/* <Mutation
                mutation={UPDATE_USER_MUTATION}
                // variables={this._variables()}
                update={this.update}>
                {(createRentalApplication, { error }) => (
                  <>
                    <Error error={error} />
                    <button
                      color="primary"
                      onClick={() =>
                        this._createRentalApplication(
                          createRentalApplication,
                          me
                        )
                      }>
                      Create New Group Application
                    </button>
                  </>
                )}
              </Mutation> */}
              <h1>
                firstName :{me.firstName}
                <button
                  onClick={() =>
                    this.setState({
                      modalIsOpen: true,
                      variable: "firstName",
                      variableVal: me.firstName,
                    })
                  }>
                  EDIT
                </button>
              </h1>
              current:
              {/* <TextInput
                id="email"
                label="email"
                type="text"
                name="email"
                placeholder={me.email}
                onChange={this.saveToState}
              /> */}
              <button onClick={() => this._updateUser(updateUser)}>
                Update
              </button>
            </div>
          )
        }}
      </Composed>
    )
  }
}
