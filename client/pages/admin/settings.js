import PropTypes from 'prop-types';
import React from 'react';

//components
import PageHeader from '@/Components/PageHeader';
// admin components
import AdminSettings from '@/AdminComponents/AdminSettings';
import AdminOnly from '@/Components/AdminOnly';

const AdminSettingsPage = ({ appData: { currentUser } }) => {
  const me = currentUser.data ? currentUser.data.me : null;
  return (
    <>
      <PageHeader
        title="Admin Settings"
        intro="Decide what system updates you want to subscribe to"
        metaData={{
          title: 'Admin Settings',
          content: 'Admin settings for subscriptions',
        }}
      />
      <AdminOnly me={me}>
        <AdminSettings me={me} />
      </AdminOnly>
    </>
  );
};

AdminSettingsPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default AdminSettingsPage;
