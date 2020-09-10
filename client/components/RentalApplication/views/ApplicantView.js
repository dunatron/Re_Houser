import PropTypes from "prop-types";
import React from 'react';
import { Paper, Typography } from '@material-ui/core';

const RentalApplicationApplicantView = ({ me }) => {
  return (
    <Paper>
      <Typography variant="h3" gutterBottom color="secondary">
        You are an applicant for this application
      </Typography>
    </Paper>
  );
};

RentalApplicationApplicantView.propTypes = {
  me: PropTypes.any.isRequired
}

export default RentalApplicationApplicantView;
