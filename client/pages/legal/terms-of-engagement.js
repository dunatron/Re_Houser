import PropTypes from 'prop-types';
import Dashboard from '@/Components/Dashboard/index';
import PleaseSignIn from '@/Components/PleaseSignIn';

import DASHBOARD_CONFIG from '@/Lib/configs/dashboardConfig';
import INFO_DASHBOARD_CONFIG from '@/Lib/configs/infoDashboardConfig';
import Head from 'next/head';
import { SITE_NAME } from '@/Lib/const';
import PageHeader from '@/Components/PageHeader';
import SecurityStatementPdf from '@/Components/Pdfs/SecurityStatementPdf';
import PdfGenerator from '@/Components/Pdfs/PdfGenerator';
import PdfTextGenerator from '@/Components/Pdfs/TextGenerator';
import securityStatementPdfConf from '@/Lib/configs/pdfs/securityStatement';

const TermsOfEngagementPage = ({ appData: { currentUser } }) => {
  return (
    <>
      <PageHeader
        title="Terms of Engagement"
        intro="Our Terms of Engagement"
        metaData={{
          title: 'Terms of Engagement',
          content: 'Our Terms of Engagement',
        }}
      />
      <PdfTextGenerator config={securityStatementPdfConf} />
      <PdfGenerator
        config={securityStatementPdfConf}
        docConf={{
          title: 'Rehouser Security Statement',
          author: 'Dunatron',
          subject: 'Rehouser security statement to our users',
          keywords: 'Security statemenet, security, files, pdf',
          creator: 'Heath Dunlop',
          producer: 'Heath McDonough',
        }}
      />
    </>
  );
};

TermsOfEngagementPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object,
  }),
};

export default TermsOfEngagementPage;
