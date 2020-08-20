import ComingSoon from '../../components/ComingSoon';
import { Paper, Typography } from '@material-ui/core';
import Fees from '../../components/Fees';
import PageHeader from '../../components/PageHeader';

import { TermsOfEngagement } from '../../components/Terms';

const TermsOfEngagementPage = () => {
  return (
    <>
      <PageHeader
        title="Terms of engagement"
        intro="These are the terms of engagement a landlord will need to agree to so Rehouser Property Management Ltd can act on their behalf."
        metaData={{
          title: 'Rehouser | Terms of engagement',
          content:
            'These are the terms of engagement a landlord will need to agree to so Rehouser Property Management Ltd can act on their behalf.',
        }}
      />
      <TermsOfEngagement />
    </>
  );
};

export default TermsOfEngagementPage;
