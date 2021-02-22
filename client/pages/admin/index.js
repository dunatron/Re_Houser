import PropTypes from 'prop-types';
import { useContext } from 'react';
import { store } from '@/Store/index';

import Dashboard from '@/Components/Dashboard';
import PageHeader from '@/Components/PageHeader';
import AdminOnly from '@/Components/AdminOnly';

import ADMIN_DASHBOARD_CONFIG from '@/Lib/configs/dashboards/adminDashConf';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

/**
 *
 * I have a dream, to put all my updates here for admins.
 * except it wont work here. needs to be on the page root
 */
const AdminDashboardPage = ({ appData: { currentUser } }) => {
  const me = currentUser.data ? currentUser.data.me : null;
  const globalStore = useContext(store);
  const { dispatch, state } = globalStore;

  return (
    <div>
      <PageHeader
        title="Admin Portal"
        intro="The admin portal is where staff can get an overview of the system"
        metaData={{
          title: 'Admin portal',
          content:
            'Admin portal to manage rehouser clients and day to day activities',
        }}
      />
      <AdminOnly me={me}>
        <Dashboard
          config={ADMIN_DASHBOARD_CONFIG({ state: state })}
          // elevation={20}
          elevation={0}
        />
      </AdminOnly>
    </div>
  );
};

AdminDashboardPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default AdminDashboardPage;
