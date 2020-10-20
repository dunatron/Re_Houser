import PropTypes from 'prop-types';
import Dashboard from '@/Components/Dashboard/index';
import PleaseSignIn from '@/Components/PleaseSignIn';

import DASHBOARD_CONFIG from '@/Lib/configs/dashboardConfig';
import INFO_DASHBOARD_CONFIG from '@/Lib/configs/infoDashboardConfig';
import Head from 'next/head';
import { SITE_NAME } from '@/Lib/const';
import PageHeader from '@/Components/PageHeader';
import SecurityStatementPdf from '@/Components/Pdfs/SecurityStatementPdf';
import TextPdfGeneratorCombo from '@/Components/Pdfs/TextPdfGeneratorCombo';
import PdfGenerator from '@/Components/Pdfs/PdfGenerator';
import PdfTextGenerator from '@/Components/Pdfs/TextGenerator';
import privacyPolicyPdfConf from '@/Lib/configs/pdfs/privacyPolicy';

const PrivacyPolicyPage = ({ appData: { currentUser } }) => {
  return (
    <>
      <PageHeader
        // title="Rehouser Security Statement"
        // intro="Our Security statement to our users"
        metaData={{
          title: 'Rehouser Privacy Policy',
          content: 'Our Privacy Policy to our users',
        }}
      />
      {/* <SecurityStatementPdf /> */}
      <TextPdfGeneratorCombo
        config={privacyPolicyPdfConf}
        docConf={{
          title: 'Rehouser Privacy Policy',
          author: 'Dunatron',
          subject: 'Rehouser privacy policy to our users',
          keywords: 'Privacy Policy, security, files, pdf',
          creator: 'Heath Dunlop',
          producer: 'Heath Dunlop',
        }}
      />
      {/* <PdfTextGenerator config={privacyPolicyPdfConf} />
      <PdfGenerator
        config={privacyPolicyPdfConf}
        docConf={{
          title: 'Rehouser Security Statement',
          author: 'Dunatron',
          subject: 'Rehouser security statement to our users',
          keywords: 'Security statemenet, security, files, pdf',
          creator: 'Heath Dunlop',
          producer: 'Heath McDonough',
        }}
      /> */}
    </>
  );
};

PrivacyPolicyPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object,
  }),
};

export default PrivacyPolicyPage;
