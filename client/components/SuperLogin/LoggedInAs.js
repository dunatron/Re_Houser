import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import ChangeRouteButton from '@/Components/Routes/ChangeRouteButton';
import Signout from '@/Components/Signout/index';

import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import SendConfirmEmailButton from '@/Components/MutationButtons/SendConfrimEmailButton';
import ResendConfirmEmailButton from '@/Components/MutationButtons/ResendConfirmEmail';
import ConfirmEmail from '@/Components/ConfirmEmail';

const LoggedInAs = ({ me }) => {
  if (!me) return null;
  return (
    <div>
      <h2>
        logged in as{' '}
        <span>
          {me.firstName} {me.lastName}
        </span>
      </h2>
      {!me.emailValidated && (
        <>
          <Typography gutterBottom variant="body1" color="error">
            Please check your email for a link or token to validate your account
          </Typography>
          <SendConfirmEmailButton />
        </>
      )}
      <Signout me={me} />

      <div>
        <h3>You may like to</h3>
        {/* Search For Properties */}
        <ChangeRouteButton
          title="Look for rentals"
          route="/property-search"
          variant="outlined"
        />
        <ChangeRouteButton
          title="Add Property"
          route="/landlord/properties/add"
          variant="outlined"
        />
      </div>
    </div>
  );
};

LoggedInAs.propTypes = {
  classes: PropTypes.object.isRequired,
  me: PropTypes.shape({
    emailValidated: PropTypes.any,
    firstName: PropTypes.any,
    lastName: PropTypes.any
  }).isRequired,
  theme: PropTypes.object.isRequired
};

export default LoggedInAs;
