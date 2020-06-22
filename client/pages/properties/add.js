import React, { Component } from 'react';
import CreateProperty from '../../components/CreateProperty/index';
import PleaseSignIn from '../../components/PleaseSignIn';
import { is } from 'ramda';
import PageHeader from '../../components/PageHeader';

const AddPropertyPage = props => {
  const pleaseSignInMessage =
    'You must be signed in to add properties to the market';
  const {
    appData: { currentUser },
    query,
  } = props;
  console.log('The query data attached => ', query);

  // just send normal data, useRamda. if its a string, decode the fucker
  const formattedData = {
    location: 'bla bla bla',
    rent: 209,
    rooms: 6,
    bathrooms: 2,
  };
  return (
    <>
      <PageHeader
        title="Add Property"
        intro="Add a property to the platform. You can configure it after creation before it goes on the market"
        metaData={{
          title: 'add a property to the platform',
          content: 'Add a property to the platform',
        }}
      />
      <PleaseSignIn
        currentUser={currentUser}
        message={pleaseSignInMessage}
        alert={
          <p>
            <strong>{pleaseSignInMessage}</strong>
          </p>
        }>
        <CreateProperty prefilledData={formattedData} />
      </PleaseSignIn>
    </>
  );
};

export default AddPropertyPage;
