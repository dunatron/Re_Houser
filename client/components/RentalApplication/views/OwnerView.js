import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import RentalApplicationStepper from '../../RentalApplicationStepper';
import { useSubscription, useQuery } from '@apollo/client';
import { SINGLE_PROPERTY_QUERY } from '../../../graphql/queries';

/**
 * This is the person who originally applied fro the property
 * ToDo
 * any number of applicants are allowed. It is upto the property owner to accept applicants
 * the total rent should be a total of the vacanices available, that way we can describe the place and let
 * the tenants delegate the space themselves
 * - accept members,
 * - submit the application
 * - Allow them to pass ownership to someone else
 * - Close application entirely
 *
 */
const RentalApplicationOwnerView = ({ me, rentalApplication }) => {
  console.log(
    'Is this not property data? rentalApplication => ',
    rentalApplication
  );

  return (
    <Paper>
      <Typography variant="h3" gutterBottom color="secondary">
        You are the owner application
      </Typography>
      <RentalApplicationStepper
        application={rentalApplication}
        me={me}
        property={rentalApplication.property}
      />
    </Paper>
  );
};

export default RentalApplicationOwnerView;