import React, { Component } from "react"
import styled from "styled-components"
// components
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
//icons
import PersonIcon from "@material-ui/icons/Person"
import PersonAddIcon from "@material-ui/icons/PersonAdd"

const Item = styled.div`
  .user__strip {
    display: flex;
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
  render() {
    const { application, index } = this.props
    return (
      <Item>
        <div>Application {index + 1}</div>
        {application.applicants &&
          application.applicants.map((applicant, idx) => {
            return (
              <div className="user__strip">
                <Tooltip
                  title={`view ${applicant.firstName} ${applicant.lastName}`}
                  placement="top">
                  <IconButton className="person__btn" aria-label="Delete">
                    <PersonIcon className="person__icon" />
                  </IconButton>
                </Tooltip>

                <p className="name">
                  {applicant.firstName} {applicant.lastName}
                </p>
              </div>
            )
          })}
        <div className="user__strip">
          <Tooltip title={`apply to group`} placement="top">
            <IconButton className="person__btn" aria-label="Delete">
              <PersonAddIcon className="person__icon" />
            </IconButton>
          </Tooltip>
          [APPLY TO GROUP]
        </div>
        <hr />
      </Item>
    )
  }
}
