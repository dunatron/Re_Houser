import PropTypes from 'prop-types';
import PropertiesManager from '@/AdminComponents/PropertiesManager';
import CrashesContainer from '@/AdminComponents/Crashes';
import PageHeader from '@/Components/PageHeader';
import AdminOnly from '@/Components/AdminOnly';

const AdminTestPage = ({ appData: { currentUser } }) => {
  const me = currentUser.data ? currentUser.data.me : null;

  return (
    <>
      <PageHeader
        title="Admin Test Page"
        intro="A page to run tests on"
        children={[]}
        metaData={{
          title: 'Admin Test Page',
          content: 'A page to run tests on',
        }}
      />
      <AdminOnly me={me}>
        <CrashesContainer me={me} />
      </AdminOnly>
    </>
  );
};

AdminTestPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default AdminTestPage;
