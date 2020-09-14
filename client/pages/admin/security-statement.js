import PropTypes from 'prop-types';
import React from 'react';

//components
import PageHeader from '@Components/PageHeader';
// admin components
import AdminOnly from '@Components/AdminOnly';
import SecurityStatementPdf from '@Components/Pdfs/SecurityStatementPdf';

const SecurityStatementPage = ({ appData: { currentUser } }) => {
  const me = currentUser.data ? currentUser.data.me : null;
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
      <AdminOnly me={me}>
        <SecurityStatementPdf />
      </AdminOnly>
    </>
  );
};

SecurityStatementPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default SecurityStatementPage;
