import React, { Component } from "react"
import { Mutation } from "react-apollo"
import { adopt } from "react-adopt"
import styled from "styled-components"
// components
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
// import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanel from "../../styles/ExpansionPanel"
import ExpansionPanelSummary from "../../styles/ExpansionPanelSummary"
// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
// import Typography from "@material-ui/core/Typography"
import Typography from "../../styles/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

//icons
import PersonIcon from "@material-ui/icons/Person"
import PersonAddIcon from "@material-ui/icons/PersonAdd"
import PersonOutlineIcon from "@material-ui/icons/PersonOutline"

import StarIcon from "../../styles/icons/StarIcon"
// Mutations
import {
  APPLY_TO_RENTAL_GROUP_APPLICATION,
  CREATE_PRE_RENTAL_DOCUMENT_MUTATION,
} from "../../mutation/index"
import ApplyToGroup from "./ApplyToGroup"
import User from "../User/index"
import { save } from "save-file" //432,310
import { saveAs } from "file-saver" // more popular 432,310

const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  applyToRentalGroup: ({ render }) => (
    <Mutation
      mutation={APPLY_TO_RENTAL_GROUP_APPLICATION}
      update={(cache, payload) => {
        console.log(
          "I dont think this is being called. ApplyToGroup is handling the apply to group"
        )
      }}>
      {render}
    </Mutation>
  ),
  createPreRentalDocument: ({ render }) => (
    <Mutation
      mutation={CREATE_PRE_RENTAL_DOCUMENT_MUTATION}
      update={(cache, payload) => {
        console.log(
          "cool we can do our updates from hree. maybe evem export these functions. maybe even do hook functions"
        )
      }}>
      {render}
    </Mutation>
  ),
})

const Item = styled.div`
  .user__strip {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 0 0 16px;
  }
  .person__btn {
  }
  .approved {
    color: green;
  }
  .pending {
  }
  .completed {
    color: orange;
  }
  .person__icon {
  }
  .name {
  }
  @media (max-width: ${props => props.theme.breakpoints.values.sm}px) {
  }
`

export default class ApplicationItem extends Component {
  state = {
    creatingDoc: false,
  }
  _applyToRentalGroup = async applyToRentalGroup => {
    const res = applyToRentalGroup()
  }
  _createPreRentalDocument = async createPreRentalDocument => {
    const docyBuff = await createPreRentalDocument({
      variables: {
        id: 1,
      },
    })

    // file-saver
    const fileName = "preRentalDocument.docx"
    const theBuf = docyBuff.data.createPreRentalDocument.data
    this.setState({ creatingDoc: false })
    await save(theBuf, fileName)

    var file = new File(["Hello, world!"], "hello world.txt")
    // saveAs(docyBuff, "test.docx")
  }
  getNumberOfApprovedApplicants = application => {
    // console.log("application getNumberOfApprovedApplicants=> ", application)
    const numberOfApproved = application.applicants.reduce(
      (amount, applicant) => {
        if (applicant.approved) {
          amount++
        }
        return amount
      },
      0
    )
    return numberOfApproved
  }
  getNumberOfPendingApplicants = application => {
    // console.log("application getNumberOfApprovedApplicants=> ", application)
    const numberOfApproved = application.applicants.reduce(
      (amount, applicant) => {
        if (!applicant.approved) {
          amount++
        }
        return amount
      },
      0
    )
    return numberOfApproved
  }

  applicantStage = applicant => {
    if (applicant.approved) return "approved"
    if (applicant.completed) return "completed"
    return ""
  }

  isAnApplicant = (me, application) => {
    const isApplicant = application.applicants
      .map(applicant => applicant.user)
      .map(user => user.id)
      .includes(me.id)
    return isApplicant
  }

  isOwner = (me, application) => {
    if (me.id === application.owner.id) {
      return true
    }
    return false
  }

  render() {
    const { application, index, property } = this.props
    return (
      <Composed>
        {({ applyToRentalGroup, user, createPreRentalDocument }) => {
          const me = user.data.me
          if (!me) {
            return "You must be logged In"
          }
          const isAnApplicant = this.isAnApplicant(me, application)
          const isOwner = this.isOwner(me, application)
          return (
            <ExpansionPanel highlight={isAnApplicant}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                highlight={isAnApplicant}
                highlightReverse={isOwner}
                background={isAnApplicant ? "green" : ""}>
                <PersonIcon color={isOwner ? "secondary" : "primary"} />
                <Typography
                  highlightReverse={isOwner}
                  highlight={isAnApplicant}
                  style={{ padding: "0 16px 0 4px" }}>
                  {this.getNumberOfApprovedApplicants(application)}
                </Typography>
                <PersonOutlineIcon color={isOwner ? "secondary" : "primary"} />
                <Typography
                  highlightReverse={isOwner}
                  highlight={isAnApplicant}
                  style={{ padding: "0 16px 0 4px" }}>
                  {this.getNumberOfPendingApplicants(application)}
                </Typography>
                <StarIcon color={isOwner ? "secondary" : "primary"} />
                <Typography
                  highlightReverse={isOwner}
                  highlight={isAnApplicant}
                  style={{ padding: "0 16px 0 4px" }}>
                  {application.stage}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Item>
                  {this.state.creatingDoc && (
                    <div>Generating your application please wait</div>
                  )}
                  {me.id && this._advanceApplication(me, application)}
                  <Button
                    disabled={this.state.creatingDoc}
                    variant="outlined"
                    onClick={() => {
                      this.setState({ creatingDoc: true })
                      this._createPreRentalDocument(createPreRentalDocument)
                    }}>
                    Generate Document as of Now
                  </Button>
                  {application.applicants &&
                    application.applicants.map((applicant, idx) => {
                      const {
                        user: { id, firstName, lastName },
                      } = applicant
                      return (
                        <div className="user__strip">
                          <Tooltip
                            title={`view ${firstName} ${lastName}`}
                            placement="top">
                            <IconButton
                              // className="person__btn"
                              className={`person__btn ${this.applicantStage(
                                applicant
                              )}`}
                              aria-label="Delete">
                              <PersonIcon className="person__icon" />
                            </IconButton>
                          </Tooltip>

                          <p className="name">
                            {firstName} {lastName}
                          </p>
                        </div>
                      )
                    })}
                </Item>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
        }}
      </Composed>
    )
  }

  _advanceApplication = (me, application) => {
    const isAnApplicant = this.isAnApplicant(me, application)
    // console.log("isAnApplicant => ", isAnApplicant)
    return (
      <div>
        {!isAnApplicant && this.renderApplyToGroupBtn()}
        {isAnApplicant && this.renderUpdateApplicationBtn()}
      </div>
    )
  }
  renderUpdateApplicationBtn = () => {
    const { application, index, property } = this.props
    return (
      <div>
        <Button
          variant="outlined"
          onClick={() => {
            this.props.openRentalAppModal(application)
          }}>
          UPDATE APPLICATION
        </Button>
        {/* <Button
          disabled={loading}
          onClick={() => this._updateUser(updateUser)}
          variant="outlined">
          Update
        </Button> */}
      </div>
    )
  }

  renderApplyToGroupBtn = () => {
    const { application, index, property } = this.props
    return (
      <ApplyToGroup
        applicationId={application.id}
        application={application}
        property={property}
        openRentalAppModal={rentalData =>
          this.props.openRentalAppModal(rentalData)
        }
      />
    )
  }
}
