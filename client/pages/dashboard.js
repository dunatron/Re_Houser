import Dashboard from '../components/Dashboard/index';
import PleaseSignIn from '../components/PleaseSignIn';

import DASHBOARD_CONFIG from '../lib/configs/dashboardConfig';
import INFO_DASHBOARD_CONFIG from '../lib/configs/infoDashboardConfig';
import Head from 'next/head';
import { SITE_NAME } from '../lib/const';
import PageHeader from '../components/PageHeader';

const DashboardPage = props => {
  const {
    appData: { currentUser },
  } = props;
  return (
    <>
      <PageHeader
        title="Rehouser Activity"
        intro="Here is the system activity in regards to you. You can use this to
        quickly see activity on your properties, applications and lease"
        metaData={{
          title: 'Rehouser | dashboard',
          content:
            'rehouser dashboard to manage all of your property and lease needs',
        }}
      />
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
