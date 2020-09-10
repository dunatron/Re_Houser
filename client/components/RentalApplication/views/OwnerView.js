import PropTypes from "prop-types";
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
  return (
    <Paper>
      <Typography gutterBottom color="secondary">
        You are the creator of the application
      </Typography>
      <RentalApplicationStepper
        application={rentalApplication}
        me={me}
        property={rentalApplication.property}
      />
    </Paper>
  );
};

RentalApplicationOwnerView.propTypes = {
  me: PropTypes.any.isRequired,
  rentalApplication: PropTypes.shape({
    property: PropTypes.any
  }).isRequired
}

export default RentalApplicationOwnerView;
