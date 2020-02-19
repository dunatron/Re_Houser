import React, { Component } from 'react';
import CreateProperty from '../../components/CreateProperty/index';
import PleaseSignIn from '../../components/PleaseSignIn';

const AddPropertyPage = props => {
  const pleaseSignInMessage =
    'You must be signed in to add properties to the market';
  return (
    <PleaseSignIn
      message={pleaseSignInMessage}
      alert={
        <p>
          <strong>{pleaseSignInMessage}</strong>
        </p>
      }>
      <CreateProperty />
    </PleaseSignIn>
  );
};

export default AddPropertyPage;
