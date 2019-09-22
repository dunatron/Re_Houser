import React, { Component } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: 0,
  },
}))

const ApplicantDetails = ({ applicant }) => {
  const classes = useStyles()
  return (
    <div>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {applicant.user.firstName}
              {applicant.user.lastName}
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              Approved: {applicant.approved}
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              Email: {applicant.user.email}
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>Phone{applicant.user.phone}</Paper>
          </Grid>
        </Grid>
      </div>
      <h4></h4>
    </div>
  )
}

export default ApplicantDetails
