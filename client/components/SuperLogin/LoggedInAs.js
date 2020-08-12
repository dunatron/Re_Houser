import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import ChangeRouteButton from '../Routes/ChangeRouteButton';
import Signout from '../Signout/index';

import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import SendConfirmEmailButton from '../MutationButtons/SendConfrimEmailButton';
import ResendConfirmEmailButton from '../MutationButtons/ResendConfirmEmail';

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
      {/* Check if email validated */}
      {!me.emailValidated && (
        <div>
          <h2>Your email address has not been confirmed</h2>
          <p>
            Check your email client for an email from rehouser that will contain
            a link that helps us confirm you are who you say you are
          </p>
          {/* send current logged in users email */}
          <SendConfirmEmailButton />
          {/* <ResendConfirmEmailButton /> */}
        </div>
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
          route="/properties/add"
          variant="outlined"
        />
      </div>
    </div>
  );
};

LoggedInAs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default LoggedInAs;
