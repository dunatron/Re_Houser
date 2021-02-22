import PropTypes from 'prop-types';
import PageHeader from '@/Components/PageHeader';
import AcceptTermsOfEngagementForm from '@/Components/Forms/AcceptTermsOfEngagementForm';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

const TermsOfEngagementPage = props => {
  const {
    appData: { currentUser },
  } = props;

  const me = currentUser.data ? currentUser.data.me : null;

  return (
    <>
      <PageHeader
        // title="Terms of engagement"
        // intro="These are the terms of engagement a landlord will need to agree to so Rehouser Property Management Ltd can act on their behalf."
        metaData={{
          title: 'Rehouser | Terms of engagement',
          content:
            'These are the terms of engagement a landlord will need to agree to so Rehouser Property Management Ltd can act on their behalf.',
        }}
      />
      <AcceptTermsOfEngagementForm me={me} />
    </>
  );
};

TermsOfEngagementPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default TermsOfEngagementPage;
