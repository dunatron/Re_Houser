import ComingSoon from '../../components/ComingSoon';
import TeamComponent from '../../components/Team';
import Head from 'next/head';
import { SITE_NAME } from '../../lib/const';
import PageHeader from '../../components/PageHeader';
import { Typography } from '@material-ui/core';
import TeamInfoText from '../../components/Team/TeamInfoText';

const TeamInfoPage = () => {
  return (
    <>
      <PageHeader
        title="About Us"
        metaData={{
          title: 'Team',
          content: `${SITE_NAME} team who make the platform happen`,
        }}
        children={[<TeamInfoText />]}
      />
      <TeamComponent />
    </>
  );
};

export default TeamInfoPage;
