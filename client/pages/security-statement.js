import PropTypes from 'prop-types';
import Dashboard from '@/Components/Dashboard/index';
import PleaseSignIn from '@/Components/PleaseSignIn';

import DASHBOARD_CONFIG from '@/Lib/configs/dashboardConfig';
import INFO_DASHBOARD_CONFIG from '@/Lib/configs/infoDashboardConfig';
import Head from 'next/head';
import { SITE_NAME } from '@/Lib/const';
import PageHeader from '@/Components/PageHeader';
import SecurityStatementPdf from '@/Components/Pdfs/SecurityStatementPdf';

const SecurityStatementPage = ({ appData: { currentUser } }) => {
  return (
    <>
      <PageHeader
        title="Rehouser Security Statement"
        intro="Our Security statement to our users"
        metaData={{
          title: 'Rehouser Security Statement',
          content: 'Our Security statement to our users',
        }}
      />
      <SecurityStatementPdf />
    </>
  );
};

SecurityStatementPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object,
  }),
};

export default SecurityStatementPage;
