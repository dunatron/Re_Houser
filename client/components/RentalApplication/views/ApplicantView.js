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

export default RentalApplicationApplicantView;
