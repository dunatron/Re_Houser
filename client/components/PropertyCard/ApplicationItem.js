import React, { Component } from "react"
import { Mutation } from "react-apollo"
import { adopt } from "react-adopt"
import styled from "styled-components"
// components
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
//icons
import PersonIcon from "@material-ui/icons/Person"
import PersonAddIcon from "@material-ui/icons/PersonAdd"
// Mutations
import { APPLY_TO_RENTAL_GROUP_APPLICATION } from "../../mutation/index"
import ApplyToGroup from "./ApplyToGroup"
import User from "../User/index"

const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  applyToRentalGroup: ({ render }) => (
    <Mutation mutation={APPLY_TO_RENTAL_GROUP_APPLICATION}>{render}</Mutation>
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
  .person__icon {
  }
  .name {
  }
  @media (max-width: ${props => props.theme.breakpoints.values.sm}px) {
  }
`

export default class ApplicationItem extends Component {
  _applyToRentalGroup = async applyToRentalGroup => {
    const res = applyToRentalGroup()
  }
  render() {
    const { application, index } = this.props
    console.log("application => ", application)
    return (
      <Composed>
        {({ applyToRentalGroup, user }) => {
          const me = user.data.me
          return (
            <Item>
              <div>Application {index + 1}</div>
              <div>{application.stage}</div>
              {application.applicants &&
                application.applicants.map((applicant, idx) => {
                  console.log("applicant => ", applicant)
                  const {
                    user: { id, firstName, lastName },
                  } = applicant
                  return (
                    <div className="user__strip">
                      <Tooltip
                        title={`view ${firstName} ${lastName}`}
                        placement="top">
                        <IconButton className="person__btn" aria-label="Delete">
                          <PersonIcon className="person__icon" />
                        </IconButton>
                      </Tooltip>

                      <p className="name">
                        {firstName} {lastName}
                      </p>
                    </div>
                  )
                })}
              {/* BELOW is avail if not already member */}
              {me.id
                ? !application.applicants
                    .map(applicant => applicant.user)
                    .map(user => user.id)
                    .includes(me.id) && (
                    <div className="user__strip">
                      <ApplyToGroup applicationId={application.id} />
                    </div>
                  )
                : ""}

              <hr />
            </Item>
          )
        }}
      </Composed>
    )
  }
}
