import React, { Component } from "react"
import { useQuery } from "react-apollo-hooks"
import { RENTAL_APPLICATIONS_QUERY } from "../../query/index"
import Card from "@material-ui/core/Card"
import ExpansionPanel from "../../styles/ExpansionPanel"
import ExpansionPanelSummary from "../../styles/ExpansionPanelSummary"
// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import DialogPopup from "../DialogPopup/index"
// import Typography from "@material-ui/core/Typography"
import Typography from "../../styles/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
//icons
import PersonIcon from "@material-ui/icons/Person"
import PersonAddIcon from "@material-ui/icons/PersonAdd"
import PersonOutlineIcon from "@material-ui/icons/PersonOutline"

import StarIcon from "../../styles/icons/StarIcon"

const RentalApplications = props => {
  const { data, error, loading } = useQuery(RENTAL_APPLICATIONS_QUERY, {
    variables: {
      where: {
        property: {
          id: props.property.id,
        },
      },
    },
    suspend: false,
  })
  if (loading) {
    return <div>fetching applications please wait....</div>
  }
  if (error) {
    return <div>Error! {error.message}</div>
  }
  return (
    <div>
      <h1>I am the Applications details component</h1>
      {data.rentalApplications.map((application, i) => {
        return (
          <Card style={{ marginBottom: "30px" }}>
            <DialogPopup isOpen={true} />
            <Typography>ID: {application.id}</Typography>
            <Typography>Visibility: {application.visibility}</Typography>
            <Typography>Stage: {application.stage}</Typography>
            <Typography>
              FINALISED: {application.finalised ? "YES" : "NO"}
            </Typography>
            <Typography>
              <button>Accept application</button>
            </Typography>
            <Typography>
              <button>Deny application</button>
            </Typography>
            <Typography>
              FINALISED: {application.finalised ? "YES" : "NO"}
            </Typography>
            <ExpansionPanel highlight={false}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                // highlight={isAnApplicant}
                // highlightReverse={isOwner}
                // background={isAnApplicant ? "green" : ""}
              >
                <PersonIcon color={"secondary"} />
                <Typography
                  // highlightReverse={isOwner}
                  // highlight={isAnApplicant}
                  style={{ padding: "0 16px 0 4px" }}>
                  {application.applicants.length} Applicants
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div>
                  <h2>Some stuff</h2>
                  {application.applicants.map((applicant, i) => {
                    return (
                      <div>
                        {applicant.id}
                        {applicant.approved}
                      </div>
                    )
                  })}
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Card>
        )
      })}
    </div>
  )
}

export default RentalApplications
