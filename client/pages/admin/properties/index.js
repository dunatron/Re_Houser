import PropTypes from 'prop-types';
import PropertiesManager from '@/AdminComponents/PropertiesManager';
import PageHeader from '@/Components/PageHeader';
import AdminOnly from '@/Components/AdminOnly';

const AdminPropertiesPage = ({ appData: { currentUser } }) => {
  const me = currentUser.data ? currentUser.data.me : null;

  return (
    <>
      <PageHeader
        title="Admin Properties"
        intro="ALl properties on our system"
        children={[]}
        metaData={{
          title: 'Admin Properties',
          content: 'manage properties on the system as an admin',
        }}
      />
      <AdminOnly me={me}>
        <PropertiesManager me={me} />
      </AdminOnly>
    </>
  );
};

AdminPropertiesPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default AdminPropertiesPage;
