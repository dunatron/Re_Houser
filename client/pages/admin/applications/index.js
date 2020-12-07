import PropTypes from 'prop-types';
import RentalApplicationsManager from '@/AdminComponents/RentalApplicationsManager';
import PageHeader from '@/Components/PageHeader';
import { Typography } from '@material-ui/core';
import AdminOnly from '@/Components/AdminOnly';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

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

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx);
  await apolloClient.query({
    query: CURRENT_USER_QUERY,
  });
  return addApolloState(apolloClient, {
    props: {},
  });
}

export default AdminApplicationsPage;
