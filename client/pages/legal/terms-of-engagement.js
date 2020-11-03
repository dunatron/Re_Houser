import PropTypes from 'prop-types';

import PageHeader from '@/Components/PageHeader';
import TextPdfGeneratorCombo from '@/Components/Pdfs/TextPdfGeneratorCombo';
import termsOfEngagementPdfConf from '@/Lib/configs/pdfs/termsOfEngagement';

const TermsOfEngagementPage = ({ appData: { currentUser } }) => {
  return (
    <>
      <PageHeader
        // title="Terms of Engagement"
        // intro="Our Terms of Engagement"
        hidden={true}
        metaData={{
          title: 'Terms of Engagement',
          content: 'Our Terms of Engagement',
        }}
      />
      <TextPdfGeneratorCombo
        config={termsOfEngagementPdfConf}
        docConf={{
          title: 'Terms of Engagement',
          author: 'Dunatron',
          subject: 'Rehouser Terms of Engagement for Landlords',
          keywords: 'Terms of engagement, security, files, pdf',
          creator: 'Heath Dunlop',
          producer: 'Heath Dunlop',
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
