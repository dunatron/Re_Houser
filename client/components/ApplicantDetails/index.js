import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: theme.palette.secondary.light,
    borderRadius: 0,
    wordWrap: 'break-word',
    height: '100%',
  },
  approvedPaper: {
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  gridItem: {
    // border: "1px solid red",
  },
}));

const ApplicantDetails = ({ applicant }) => {
  const classes = useStyles();
  const paperClassName = clsx(
    classes.paper,
    applicant.approved && classes.approvedPaper
  );
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} className={classes.gridItem}>
          <Paper className={paperClassName}>
            {applicant.user.firstName}
            {applicant.user.lastName}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={paperClassName}>Email: {applicant.email}</Paper>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Paper className={paperClassName}>
            Approved: {applicant.approved ? 'YES' : 'NO'}
          </Paper>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Paper className={paperClassName}>Phone{applicant.user.phone}</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

ApplicantDetails.propTypes = {
  applicant: PropTypes.shape({
    approved: PropTypes.any,
    email: PropTypes.any,
    user: PropTypes.shape({
      firstName: PropTypes.any,
      lastName: PropTypes.any,
      phone: PropTypes.any,
    }),
  }).isRequired,
};

export default ApplicantDetails;
