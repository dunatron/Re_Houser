import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core/';
import clsx from 'clsx';

import BaseApplicantDetails from './index';
import FormDetails from '@/Components/Forms/FormDetails';
import PRE_TENANCY_FORM_CONF from '@/Lib/configs/preTenancyFormConf';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 0,
    wordWrap: 'break-word',
    height: '100%',
  },
  approvedPaper: {
    background: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
  gridItem: {
    // border: "1px solid red",
  },
}));

const AdminApplicantDetails = ({ applicant }) => {
  const classes = useStyles();
  const paperClassName = clsx(
    classes.paper,
    applicant.approved && classes.approvedPaper
  );
  return (
    <div className={classes.root}>
      <BaseApplicantDetails applicant={applicant} />
      <FormDetails
        title="Submiited PreTenancy Application Form"
        config={PRE_TENANCY_FORM_CONF}
        data={applicant.preTenancyApplicationForm}
      />
    </div>
  );
};

AdminApplicantDetails.propTypes = {
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

export default AdminApplicantDetails;
