import PropTypes from 'prop-types';

import PageHeader from '@/Components/PageHeader';
import TextPdfGeneratorCombo from '@/Components/Pdfs/TextPdfGeneratorCombo';
import privacyPolicyPdfConf from '@/Lib/configs/pdfs/privacyPolicy';

const PrivacyPolicyPage = ({ appData: { currentUser } }) => {
  return (
    <>
      <PageHeader
        title="Rehouser Privacy Policy"
        intro="Our Privacy Policy to our users"
        hidden={true}
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
    </>
  );
};

PrivacyPolicyPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object,
  }),
};

export default PrivacyPolicyPage;
