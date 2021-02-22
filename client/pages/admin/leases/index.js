import PropTypes from 'prop-types';
import AppraisalManager from '@/AdminComponents/AppraisalManager';
import PageHeader from '@/Components/PageHeader';
import { Typography } from '@material-ui/core';
import AdminOnly from '@/Components/AdminOnly';

import LeasesTable from '@/Components/Tables/LeasesTable';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

const AdminLeasesPage = ({ appData: { currentUser } }) => {
  const me = currentUser.data ? currentUser.data.me : null;
  return (
    <>
      <PageHeader
        title="Admin Leases"
        intro="This is where you can find all of our system leases that exists"
        metaData={{
          title: 'Admin leases portal',
          content:
            'Rehouser admins can visit this page to get all of the property leases that exists in the system',
        }}
      />
      <AdminOnly me={me}>
        <LeasesTable />
      </AdminOnly>
    </>
  );
};

AdminLeasesPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default AdminLeasesPage;
