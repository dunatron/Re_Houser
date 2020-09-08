import React, { useState, useRef } from 'react';
import PleaseSignIn from '../../components/PleaseSignIn';
import FileUploader from '../../components/FileUploader';
import { Typography } from '@material-ui/core';
//components
import PageHeader from '../../components/PageHeader';
// admin components
import AdminOnly from '../../components/AdminOnly';
import SecurityStatementPdf from '../../components/Pdfs/SecurityStatementPdf';

const SecurityStatementPage = props => {
  const {
    appData: { currentUser },
  } = props;
  return (
    <>
      <PageHeader
        title="Security Statement"
        intro="Rehouser security statment which will be able to be downloaded as a pdf at any time"
        metaData={{
          title: 'Security Statement',
          content:
            'Rehouser security statment which will be able to be downloaded as a pdf at any time',
        }}
      />
      <AdminOnly me={currentUser.data ? currentUser.data.me : {}}>
        {/* <AdminSettings me={currentUser.me} /> */}
        <SecurityStatementPdf />
      </AdminOnly>
    </>
  );
};

export default SecurityStatementPage;
