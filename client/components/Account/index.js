import React, { Component } from "react"
import { Mutation } from "react-apollo"
import User from "../User/index"
import { adopt } from "react-adopt"
import InputModal from "../Modal/InputModal"

import { UPDATE_USER_MUTATION } from "../../mutation/index"
import { CURRENT_USER_QUERY } from "../../query/index"
// components
import TextInput from "../../styles/TextInput"
import Error from "../ErrorMessage/index"
import Button from "@material-ui/core/Button"
import DoneIcon from "@material-ui/icons/Done"
import ClearIcon from "@material-ui/icons/Clear"

const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  updateUser: ({ render }) => (
    <Mutation mutation={UPDATE_USER_MUTATION}>{render}</Mutation>
  ),
})

const config = [
  {
    label: "My Email",
    variableName: "email",
  },
  {
    label: "My First Name",
    variableName: "firstName",
  },
  {
    label: "My Last Name",
    variableName: "lastName",
  },
  {
    label: "My Phone",
    variableName: "phone",
  },
  {
    label: "Emergency Contact Name",
    variableName: "emergencyContactName",
  },
  {
    label: "Emergency Contact Number",
    variableName: "emergencyContactNumber",
  },
  {
    label: "Emergency Contact Email",
    variableName: "emergencyContactEmail",
  },
  {
    label: "Referee 1 Name",
    variableName: "referee1Name",
  },
  {
    label: "Referee 1 Phone",
    variableName: "referee1Phone",
  },
  {
    label: "Referee 1 Email",
    variableName: "referee1Email",
  },
  {
    label: "Referee 2 Name",
    variableName: "referee2Name",
  },
  {
    label: "Referee 2 Phone",
    variableName: "referee2Phone",
  },
  {
    label: "Referee 2 Email",
    variableName: "referee2Email",
  },
]
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
    this.closeModal()
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
  renderModalDetails = () => {
    const { variable, variableVal } = this.state
    return (
      <Mutation
        mutation={UPDATE_USER_MUTATION}
        // variables={this._variables()}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        update={this.update}>
        {(updateUser, { error, loading }) => (
          <>
            <Error error={error} />
            {loading && <p>Please wait...</p>}
            <TextInput
              disabled={loading}
              label={variable}
              value={variableVal}
              onChange={e => this.setState({ variableVal: e.target.value })}
            />
            <Button
              disabled={loading}
              onClick={() => this._updateUser(updateUser)}
              variant="outlined">
              Update
            </Button>
          </>
        )}
      </Mutation>
    )
  }
  update = (cache, payload) => {
    // const { id } = this.props.property
    // const variables = {
    //   where: {
    //     property: {
    //       id: id,
    //     },
    //   },
    // }
    // const data = cache.readQuery({
    //   query: RENTAL_APPLICATIONS_QUERY,
    //   variables: variables,
    // })
    // data.rentalApplications.push({ ...payload.data.createRentalApplication })
    // cache.writeQuery({
    //   query: RENTAL_APPLICATIONS_QUERY,
    //   data,
    //   variables: variables,
    // })
  }
  render() {
    const { modalIsOpen } = this.state
    return (
      <Composed>
        {({ user, updateUser }) => {
          const me = user.data.me
          console.log("me => ", me)
          return (
            <div>
              <InputModal open={modalIsOpen} close={() => this.closeModal()}>
                {this.renderModalDetails()}
              </InputModal>
              {config.map((conf, i) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "16px",
                    }}>
                    {me[conf.variableName] !== null ? (
                      <DoneIcon color="primary" />
                    ) : (
                      <ClearIcon color="secondary" />
                    )}
                    {conf.label}:{" "}
                    <span style={{ color: "green" }}>
                      {me[conf.variableName]}
                    </span>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() =>
                        this.setState({
                          modalIsOpen: true,
                          variable: conf.variableName,
                          variableVal: me[conf.variableName],
                        })
                      }>
                      EDIT
                    </Button>
                  </div>
                )
              })}
              <div>
                <h1>An Upload Field for PhotoId</h1>
              </div>
            </div>
          )
        }}
      </Composed>
    )
  }
}
