import PropTypes from 'prop-types';
import AppraisalManager from '@/AdminComponents/AppraisalManager';
import PageHeader from '@/Components/PageHeader';
import { Typography } from '@material-ui/core';
import AdminOnly from '@/Components/AdminOnly';
// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

const AdminSingleContactSubmissionPage = ({ appData: { currentUser } }) => {
  const me = currentUser.data ? currentUser.data.me : null;
  return (
    <>
      <PageHeader
        title="Contact submissions"
        intro="To track if they have responded and will also render a profile if the email they used was in the system"
        metaData={{
          title: 'Bank Manager',
          content: 'Managing rehousers banking system',
        }}
      />
      <AdminOnly me={me}>
        <div>Hook Into more such as the email stream of our admins</div>
      </AdminOnly>
    </>
  );
};

AdminSingleContactSubmissionPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default AdminSingleContactSubmissionPage;
