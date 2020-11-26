import PropTypes from 'prop-types';
import PropertiesManager from '@/AdminComponents/PropertiesManager';
import PageHeader from '@/Components/PageHeader';
import AdminOnly from '@/Components/AdminOnly';
import ManageUsers from '@/Components/ManageUsers';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

const AdminUsersPage = ({ appData: { currentUser } }) => {
  const me = currentUser.data ? currentUser.data.me : null;

  console.log('ADMIN ME => ', me);

  return (
    <>
      <PageHeader
        title="Manage Rehouser Users"
        intro="You will be able to manage all users in the system here, such as changing permissions"
        children={[]}
        metaData={{
          title: 'Manage Rehouser Users',
          content:
            'You will be able to manage all users in the system here, such as changing permissions',
        }}
      />
      <AdminOnly me={me} mustBeWizard>
        <ManageUsers me={me} />
      </AdminOnly>
    </>
  );
};

AdminUsersPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default AdminUsersPage;
