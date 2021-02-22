import PropTypes from 'prop-types';
import AppraisalManager from '@/AdminComponents/AppraisalManager';
import PageHeader from '@/Components/PageHeader';
import { Typography } from '@material-ui/core';
import AdminOnly from '@/Components/AdminOnly';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';
import BankManager from '@/AdminComponents/BankManager';

const AdminBankingPage = ({ appData: { currentUser } }) => {
  const me = currentUser.data ? currentUser.data.me : null;
  return (
    <>
      <PageHeader
        title="Bank Manager"
        intro="This is where the rehouser accountant will manage the banking. e.g add bank transfers with there refs into the system"
        metaData={{
          title: 'Bank Manager',
          content: 'Managing rehousers banking system',
        }}
      />
      <AdminOnly me={me}>
        <BankManager />
      </AdminOnly>
    </>
  );
};

AdminBankingPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default AdminBankingPage;
