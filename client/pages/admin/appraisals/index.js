import PropTypes from 'prop-types';
import AppraisalManager from '@/AdminComponents/AppraisalManager';
import PageHeader from '@/Components/PageHeader';
import { Typography } from '@material-ui/core';
import AdminOnly from '@/Components/AdminOnly';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

const AdminAppraisalsPage = ({ appData: { currentUser } }) => {
  const me = currentUser.data ? currentUser.data.me : null;
  return (
    <>
      <PageHeader
        title="Admin Appraisals"
        intro="This is where our admins will view appraicdsals that need to be appraised then fill in the details"
        children={[
          <Typography key={1} gutterBottom>
            Perhaps some instructions on how to use it. FUck i guess thats my
            job for bits like this
          </Typography>,
        ]}
        metaData={{
          title: 'Admin portal',
          content:
            'Admin portal to manage rehouser clients and day to day activities',
        }}
      />
      <AdminOnly me={me}>
        <AppraisalManager />
      </AdminOnly>
    </>
  );
};

AdminAppraisalsPage.propTypes = {
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

export default AdminAppraisalsPage;
