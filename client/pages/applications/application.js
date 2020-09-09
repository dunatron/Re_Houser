import PropTypes from 'prop-types';
import React from 'react';
import RentalApplication from '../../components/RentalApplication';
import PleaseSignIn from '../../components/PleaseSignIn';
import { Typography } from '@material-ui/core';

const SingleApplicationPage = ({ appData: { currentUser }, query: { id } }) => {
  return (
    <PleaseSignIn
      currentUser={currentUser}
      alert={
        <Typography component="p">
          <strong>Please SIgn in to view applications</strong>
        </Typography>
      }>
      <RentalApplication id={id} />
    </PleaseSignIn>
  );
};

SingleApplicationPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
  query: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default SingleApplicationPage;
