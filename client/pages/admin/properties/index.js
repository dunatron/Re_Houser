import PropTypes from 'prop-types';
import PropertiesManager from '@/AdminComponents/PropertiesManager';
import PageHeader from '@/Components/PageHeader';
import AdminOnly from '@/Components/AdminOnly';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';
import { PROPERTIES_COUNT_QUERY } from '@/AdminComponents/PropertiesManager/index';
import { PROPERTIES_CONNECTION_QUERY } from '@/Gql/connections';

const AdminPropertiesPage = ({ appData: { currentUser } }) => {
  const me = currentUser.data ? currentUser.data.me : null;

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
      <AdminOnly me={me}>
        <PropertiesManager me={me} />
      </AdminOnly>
    </>
  );
};

AdminPropertiesPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx);
  await apolloClient.query({
    query: CURRENT_USER_QUERY,
  });

  await apolloClient.query({
    query: PROPERTIES_COUNT_QUERY,
    variables: {
      where: {},
    },
  });

  // where: {
  //   location_contains: searchText,
  //   ...where,
  //   ...sharedWhere,
  // },
  // orderBy: orderBy,
  // skip: query.page * query.pageSize,
  // first: query.pageSize,
  // limit: query.pageSize,
  // await apolloClient.query({
  //   query: PROPERTIES_CONNECTION_QUERY,
  //   variables: {
  //     where: {},
  //   },
  // });

  return addApolloState(apolloClient, {
    props: {},
  });
}

export default AdminPropertiesPage;
