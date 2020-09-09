import PropTypes from 'prop-types';
import React from 'react';

//components
import PageHeader from '../../components/PageHeader';
// admin components
import AdminOnly from '../../components/AdminOnly';
import SecurityStatementPdf from '../../components/Pdfs/SecurityStatementPdf';

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
