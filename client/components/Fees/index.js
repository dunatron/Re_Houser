import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FeesTable from './FeesTable';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Fees = () => {
  const classes = useStyles();
  return (
    <>
      <Typography component="ul" gutterBottom>
        <Typography component="li" gutterBottom>
          Tenant screening and selection process
        </Typography>
        <Typography component="li" gutterBottom>
          Regular inspections and follow up
        </Typography>
        <Typography component="li" gutterBottom>
          Disagreement resolution
        </Typography>
        <Typography component="li" gutterBottom>
          Property advertising
        </Typography>
        <Typography component="li" gutterBottom>
          Rental market evaluations
        </Typography>
        <Typography component="li" gutterBottom>
          Bill payment management
        </Typography>
        <Typography component="li" gutterBottom>
          Maintenance management
        </Typography>
        <Typography component="li" gutterBottom>
          Access to your own Rehouser digital Property Management portfolio
        </Typography>
        <Typography component="li" gutterBottom>
          Downloadable contracts and official documents
        </Typography>
      </Typography>
      <Typography variant="h6" gutterBottom>
        All for 7.2% of rental income per week
      </Typography>
      {/* FEES TABLE */}
      <FeesTable />
      <Typography>
        In order for property Management to commence the following is required:
      </Typography>
      <Typography component="ul" gutterBottom>
        <Typography component="li" gutterBottom>
          Rental Appraisal / Agreed Rental Amount
        </Typography>
        <Typography component="li" gutterBottom>
          Rehouser Management form agreed to and confirmed.
        </Typography>
        <Typography component="li" gutterBottom>
          Owners Instruction form.
        </Typography>
      </Typography>
      <Typography>
        If there are existing tenants then the following needs to occur:
      </Typography>
      <Typography component="ul" gutterBottom>
        <Typography component="li" gutterBottom>
          Initial meeting with current tenants.
        </Typography>
        <Typography component="li" gutterBottom>
          Current Bond lodgement form and Tenancy agreement.
        </Typography>
        <Typography component="li" gutterBottom>
          Form to change Landlord/Agent.
        </Typography>
        <Typography component="li" gutterBottom>
          Rent owed and rent due date. Evidence of rent that has been paid in
          current tenancy.
        </Typography>
      </Typography>
    </>
  );
};

export default Fees;
