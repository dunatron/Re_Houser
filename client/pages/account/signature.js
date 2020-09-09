import PropTypes from 'prop-types';
import React from 'react';
import PleaseSignIn from '../../components/PleaseSignIn';
import Signature from '../../components/Signature/index';
import { Typography } from '@material-ui/core';

const AccountPage = ({ appData: { currentUser } }) => {
  return (
    <PleaseSignIn
      currentUser={currentUser}
      alert={
        <div>
          <Typography>
            <strong>Please Sign In</strong>
          </Typography>
          <Typography>
            You must be signed in to manage your rehouser signature
          </Typography>
        </div>
      }>
      <Signature />
    </PleaseSignIn>
  );
};

AccountPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default AccountPage;
