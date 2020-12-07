import PropTypes from 'prop-types';
import PageHeader from '@/Components/PageHeader';
import InspectionsTable from '@/Components/Tables/InspectionsTable';
import AdminOnly from '@/Components/AdminOnly';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

const AdminInspectionsPage = ({ appData: { currentUser } }) => {
  const me = currentUser.data ? currentUser.data.me : null;
  return (
    <>
      <PageHeader
        title="Admin Inspections"
        intro="View all system inspections so we never miss an inspection or fail to inform people of incoming inspections"
        metaData={{
          title: 'Admin Inspections',
          content:
            'View all system inspections so we never miss an inspection or fail to inform people of incoming inspections',
        }}
      />
      <AdminOnly me={me}>
        <InspectionsTable
          me={me}
          where={
            {
              // completed: false,
            }
          }
        />
      </AdminOnly>
    </>
  );
};

AdminInspectionsPage.propTypes = {
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

export default AdminInspectionsPage;
