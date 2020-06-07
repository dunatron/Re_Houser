import Dashboard from '../components/Dashboard/index';
import PleaseSignIn from '../components/PleaseSignIn';

import DASHBOARD_CONFIG from '../lib/configs/dashboardConfig';
import INFO_DASHBOARD_CONFIG from '../lib/configs/infoDashboardConfig';
import Head from 'next/head';
import { SITE_NAME } from '../lib/const';

<p className="intro"></p>;

const DashboardPage = props => {
  const {
    appData: { currentUser },
  } = props;
  return (
    <>
      <Head>
        <meta
          name="description"
          content="rehouser dashboard to manage all of your property and lease needs"
        />
        <title>Rehouser | dashboard</title>
      </Head>
      <PleaseSignIn currentUser={currentUser}>
        <Dashboard
          config={DASHBOARD_CONFIG}
          elevation={1}
          heading="Dashboard"
          intro={`This is the Hub of ${SITE_NAME}. You can get to anything from here so
          of you get lost just click on the dashboard menu item in the menu bar
          and you will return here`}
        />
        <Dashboard
          config={INFO_DASHBOARD_CONFIG}
          elevation={1}
          heading="Rehouser Info"
          intro="You can find sections with different information about rehouser and how things work including our policies"
        />
      </PleaseSignIn>
    </>
  );
};

export default DashboardPage;
