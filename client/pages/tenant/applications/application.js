import PropTypes from 'prop-types';
import React from 'react';
import RentalApplication from '@/Components/RentalApplication';
import PleaseSignIn from '@/Components/PleaseSignIn';
import { Typography } from '@material-ui/core';


const SingleApplicationPage = ({ appData: { currentUser }, query: { id } }) => {
  return (
    <PleaseSignIn
      currentUser={currentUser}
      alert={
        <Typography component="p" gutterBottom color="inherit">
          <strong>Please Sign in to view applications</strong>
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
