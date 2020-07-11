import React, { useState } from 'react';
import CreateProperty from '../../components/CreateProperty/index';
import PleaseSignIn from '../../components/PleaseSignIn';
import { is } from 'ramda';
import PageHeader from '../../components/PageHeader';
import BulkUploader from "../../components/BulkUploader"

const BulkAddPropertyPage = props => {
  const pleaseSignInMessage =
    'You must be signed in to bulk upload properties';
  const {
    appData: { currentUser },
    query,
  } = props;

  return (
    <>
      <PageHeader
        title="Bulk Property Uploader"
        intro="Add properties to the platform using our bulk uploader"
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
            <BulkUploader />
      </PleaseSignIn>
    </>
  );
};

export default BulkAddPropertyPage;