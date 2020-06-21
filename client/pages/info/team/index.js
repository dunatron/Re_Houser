import ComingSoon from '../../../components/ComingSoon';
import TeamComponent from '../../../components/Team';
import Head from 'next/head';
import { SITE_NAME } from '../../../lib/const';
import PageHeader from '../../../components/PageHeader';

const TeamInfoPage = () => {
  return (
    <>
      <PageHeader
        title="Meet the team"
        intro="Here are the people who make Re_Houser happen!"
        metaData={{
          title: 'Team',
          content: `${SITE_NAME} team who make the platform happen`,
        }}
      />
      <TeamComponent />
    </>
  );
};

export default TeamInfoPage;
