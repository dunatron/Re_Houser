import ComingSoon from '../../../components/ComingSoon';
import TeamComponent from '../../../components/Team';
import Head from 'next/head';
import { SITE_NAME } from '../../../lib/const';

const TeamInfoPage = () => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content={`${SITE_NAME} team who make the platform happen`}
        />
        <title>{SITE_NAME} | team</title>
      </Head>
      <TeamComponent />
    </>
  );
};

export default TeamInfoPage;
