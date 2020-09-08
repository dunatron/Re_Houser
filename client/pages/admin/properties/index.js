import PropertiesManager from '../../../admin-components/PropertiesManager';
import PageHeader from '../../../components/PageHeader';
import { Typography } from '@material-ui/core';
import AdminOnly from '../../../components/AdminOnly';

const AdminPropertiesPage = props => {
  const {
    appData: { currentUser },
  } = props;

  console.log('admin APplications Current user => ', currentUser);
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
      <AdminOnly me={currentUser.data ? currentUser.data.me : {}}>
        <PropertiesManager me={currentUser.data ? currentUser.data.me : {}} />
      </AdminOnly>
    </>
  );
};

export default AdminPropertiesPage;
