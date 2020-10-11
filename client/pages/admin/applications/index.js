import PropTypes from 'prop-types';
import RentalApplicationsManager from '@/AdminComponents/RentalApplicationsManager';
import PageHeader from '@/Components/PageHeader';
import { Typography } from '@material-ui/core';
import AdminOnly from '@/Components/AdminOnly';

const AdminApplicationsPage = ({ appData: { currentUser } }) => {
  const me = currentUser.data ? currentUser.data.me : null;
  return (
    <>
      <PageHeader
        title="Admin Rental Applications"
        intro="This is where admins can view rental applications in the system."
        metaData={{
          title: 'Admin Rental Applications',
          content:
            'This is where admins can view rental applications in the system.',
        }}
      />
      <AdminOnly me={me}>
        <RentalApplicationsManager me={me} />
      </AdminOnly>
    </>
  );
};

AdminApplicationsPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default AdminApplicationsPage;
