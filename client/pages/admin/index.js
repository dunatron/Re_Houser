import PropTypes from 'prop-types';
import { useContext } from 'react';
import { store } from '@/Store/index';

import Dashboard from '@/Components/Dashboard';
import PageHeader from '@/Components/PageHeader';

//material
import { Badge } from '@material-ui/core';

import TextFieldsIcon from '@material-ui/icons/TextFields';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import SettingsIcon from '@material-ui/icons/Settings';
import FriendManager from '@/Components/FriendManager';
import AdminOnly from '@/Components/AdminOnly';

import ADMIN_DASHBOARD_CONFIG from '@/Lib/configs/dashboards/adminDashConf';

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
        <FriendManager />
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
