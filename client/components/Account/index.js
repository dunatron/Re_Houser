import React, { Component } from "react"

import { Mutation } from "react-apollo"
import User from "../User/index"
import { adopt } from "react-adopt"
import InputModal from "../Modal/InputModal"
import Typography from "@material-ui/core/Typography"

import { UPDATE_USER_MUTATION } from "../../mutation/index"
import { CURRENT_USER_QUERY } from "../../query/index"
// configs
import { USER_PROFILE_CONF } from "../../lib/configs/userProfileConfig"
// components
// swiping tabs
import SwipeableViews from "react-swipeable-views"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
// completion rating
import CompletionRating from "./CompletionRating"
// CompletionIcon
import DynamicCompletionIcon from "./CompletionIcon"
// PhotoIdentification
import PhotoIdentification from "./PhotoIdentification"
import TabContainer from "./TabContainer"
import TextInput from "../../styles/TextInput"
import Error from "../ErrorMessage/index"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"

// Icons
import EditIcon from "../../styles/icons/EditIcon"
import MoreIcon from "../../styles/icons/MoreIcon"
import DetailsIcon from "../../styles/icons/DetailsIcon"
import CameraIcon from "../../styles/icons/CameraIcon"

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
    tabIndex: 0,
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
  handleTabChange = (event, value) => {
    this.setState({ tabIndex: value })
  }
  handleChangeIndex = index => {
    this.setState({ tabIndex: index })
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
    const { modalIsOpen, tabIndex } = this.state
    return (
      <Composed>
        {({ user, updateUser }) => {
          const me = user.data.me
          return (
            <div>
              <CompletionRating me={me} />
              <Tabs
                value={tabIndex}
                onChange={this.handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth">
                <Tab label="Personal Details" icon={<DetailsIcon />} />
                <Tab label="Photo Identification" icon={<CameraIcon />} />
                <Tab label="Extras" icon={<MoreIcon />} />
              </Tabs>
              <SwipeableViews
                index={tabIndex}
                onChangeIndex={this.handleChangeIndex}>
                <TabContainer>
                  {USER_PROFILE_CONF.filter(
                    conf => !conf.excludeFromDetails
                  ).map((conf, i) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          margin: "8px",
                        }}>
                        <DynamicCompletionIcon val={me[conf.variableName]} />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}>
                          {conf.label}
                          <span style={{ color: "green" }}>
                            {me[conf.variableName]}
                          </span>
                        </div>
                        <IconButton
                          aria-label="Delete"
                          onClick={() =>
                            this.setState({
                              modalIsOpen: true,
                              variable: conf.variableName,
                              variableVal: me[conf.variableName],
                            })
                          }>
                          <EditIcon color="default" />
                        </IconButton>
                      </div>
                    )
                  })}
                </TabContainer>
                <TabContainer
                  containerStyles={{
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}>
                  <PhotoIdentification
                    me={me}
                    updateVariable={(name, val) => {
                      this.setState({
                        modalIsOpen: true,
                        variable: name,
                        variableVal: val,
                      })
                    }}
                  />
                </TabContainer>
                <TabContainer>
                  <div>Third Tab</div>
                </TabContainer>
              </SwipeableViews>

              <InputModal open={modalIsOpen} close={() => this.closeModal()}>
                {this.renderModalDetails()}
              </InputModal>
            </div>
          )
        }}
      </Composed>
    )
  }
}
