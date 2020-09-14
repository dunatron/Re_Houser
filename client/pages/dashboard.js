import PropTypes from 'prop-types';
import Dashboard from '@Components/Dashboard/index';
import PleaseSignIn from '@Components/PleaseSignIn';

import DASHBOARD_CONFIG from '@Lib/configs/dashboardConfig';
import INFO_DASHBOARD_CONFIG from '@Lib/configs/infoDashboardConfig';
import Head from 'next/head';
import { SITE_NAME } from '@Lib/const';
import PageHeader from '@Components/PageHeader';

const DashboardPage = ({ appData: { currentUser } }) => {
  return (
    <>
      <PageHeader
        title="Rehouser dashboard"
        intro="Here is the dashboard"
        metaData={{
          title: 'Dashboard',
          content:
            'Rehouser dashboard to manage all of your property and lease needs',
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

DashboardPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default DashboardPage;
