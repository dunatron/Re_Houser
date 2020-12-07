import PropTypes from 'prop-types';
import React from 'react';

//components
import PageHeader from '@/Components/PageHeader';
// admin components
import AdminSettings from '@/AdminComponents/AdminSettings';
import AdminOnly from '@/Components/AdminOnly';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

const AdminSettingsPage = ({ appData: { currentUser } }) => {
  const me = currentUser.data ? currentUser.data.me : null;
  return (
    <>
      <PageHeader
        title="Admin Settings"
        intro="Decide what system updates you want to subscribe to"
        metaData={{
          title: 'Admin Settings',
          content: 'Admin settings for subscriptions',
        }}
      />
      <AdminOnly me={me}>
        <AdminSettings me={me} />
      </AdminOnly>
    </>
  );
};

AdminSettingsPage.propTypes = {
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

export default AdminSettingsPage;
