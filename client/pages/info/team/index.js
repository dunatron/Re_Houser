import ComingSoon from '../../../components/ComingSoon';
import TeamComponent from '../../../components/Team';
import Head from 'next/head';
import { SITE_NAME } from '../../../lib/const';
import PageHeader from '../../../components/PageHeader';
import { Typography } from '@material-ui/core';

const TeamInfoPage = () => {
  return (
    <>
      <PageHeader
        title="About Us"
        metaData={{
          title: 'Team',
          content: `${SITE_NAME} team who make the platform happen`,
        }}
        children={[
          <Typography variant="h6" gutterBottom>
            Not your typical Property Management agency.
          </Typography>,
          <Typography gutterBottom>
            Instead of subscribing to a technology provider (as most Property
            Management agencies do) and offsetting the cost onto landlords,
            we’ve developed our own software and offer direct access to all of
            our customers.
          </Typography>,
          <Typography gutterBottom>
            We offer the full services of a Property Management agency, while
            giving full transparency into the process through your online
            Rehouser account.
          </Typography>,
          <Typography gutterBottom>
            Rehouser management is one part Property Investor and one part
            Coder, both with the drive to collaborate to offer better value for
            local landlords.
          </Typography>,
          <Typography gutterBottom>
            Get in touch to see how Rehouser can help manage your Property
            portfolio.
          </Typography>,
        ]}
      />
      <TeamComponent />
    </>
  );
};

export default TeamInfoPage;
