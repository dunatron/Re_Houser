import React, { Component } from 'react';
import EditProperty from '../../../components/PropertyDetails/Edit';
import PleaseSignIn from '../../../components/PleaseSignIn';
import { is } from 'ramda';

const EditPropertyPage = props => {
  const pleaseSignInMessage =
    'You must be signed in to add properties to the market';
  const {
    appData: { currentUser },
    query,
  } = props;

  if (!query.id) return <div>You need a property id as the id param</div>;
  return (
    <PleaseSignIn
      currentUser={currentUser}
      message={pleaseSignInMessage}
      alert={
        <p>
          <strong>{pleaseSignInMessage}</strong>
        </p>
      }>
      <EditProperty propertyId={query.id} />
    </PleaseSignIn>
  );
};

export default EditPropertyPage;
