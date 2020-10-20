import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreateProperty from '@/Components/CreateProperty/index';
import PleaseSignIn from '@/Components/PleaseSignIn';
import { is } from 'ramda';
import PageHeader from '@/Components/PageHeader';
import { Typography } from '@material-ui/core';

const AddPropertyPage = ({ appData: { currentUser } }) => {
  const pleaseSignInMessage =
    'You must be signed in to add properties to the market';

  // just send normal data, useRamda. if its a string, decode the fucker
  const formattedData = {
    location: 'bla bla bla',
    rent: 209,
    rooms: 6,
    bathrooms: 2,
  };

  const me = currentUser.data ? currentUser.data.me : null;
  return (
    <>
      <PageHeader
        title="Add Property"
        intro=""
        metaData={{
          title: 'add a property to the platform',
          content: 'Add a property to the platform',
        }}
      />
      <PleaseSignIn
        currentUser={currentUser}
        message={pleaseSignInMessage}
        alert={
          <Typography variant="body1" gutterBottom color="inherit">
            <strong>{pleaseSignInMessage}</strong>
          </Typography>
        }>
        <CreateProperty prefilledData={formattedData} me={me} />
      </PleaseSignIn>
    </>
  );
};

AddPropertyPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default AddPropertyPage;
