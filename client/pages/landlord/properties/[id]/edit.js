import PropTypes from 'prop-types';
import EditProperty from '@/Components/PropertyDetails/Edit';
import PleaseSignIn from '@/Components/PleaseSignIn';
import { Typography } from '@material-ui/core';
import PageHeader from '@/Components/PageHeader';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';
import { SINGLE_OWNER_PROPERTY_QUERY } from '@/Gql/queries/index';

const EditPropertyPage = ({ appData: { currentUser }, query: { id } }) => {
  const pleaseSignInMessage =
    'You must be signed in to add properties to the market';

  if (!id)
    return (
      <Typography variant="h5" color="error">
        You need a property id as the id param
      </Typography>
    );
  return (
    <>
      <PageHeader
        title="Edit Property"
        intro="You can edit the properties original details from here"
        metaData={{
          title: 'Edit property',
          content: 'Edit your created property',
        }}
      />
      <PleaseSignIn
        currentUser={currentUser}
        message={pleaseSignInMessage}
        alert={
          <Typography variant="body1" gutterBottom color="inherit">
            <strong>{pleaseSignInMessage}</strong>
          </Typography>
        }>
        <EditProperty propertyId={id} />
      </PleaseSignIn>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx);
  await apolloClient.query({
    query: CURRENT_USER_QUERY,
  });
  await apolloClient.query({
    query: SINGLE_OWNER_PROPERTY_QUERY,
    variables: {
      id: ctx.query.id,
    },
  });
  return addApolloState(apolloClient, {
    props: {
      query: ctx.query,
    },
  });
}

EditPropertyPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
  query: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default EditPropertyPage;
