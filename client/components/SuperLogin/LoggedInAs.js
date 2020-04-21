import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import ChangeRouteButton from '../Routes/ChangeRouteButton';
import Signout from '../Signout/index';

import PropTypes from 'prop-types';

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
      <Signout me={me} />

      <div>
        <h3>You may like to</h3>
        {/* Search For Properties */}
        <ChangeRouteButton
          title="Look for rentals"
          route="/look"
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
