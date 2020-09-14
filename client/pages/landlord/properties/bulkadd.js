import PropTypes from 'prop-types';
import PleaseSignIn from '@Components/PleaseSignIn';
import PageHeader from '@Components/PageHeader';
import BulkUploader from '@Components/BulkUploader';

const BulkAddPropertyPage = ({ appData: { currentUser } }) => {
  const pleaseSignInMessage = 'You must be signed in to bulk upload properties';

  return (
    <>
      <PageHeader
        title="Bulk Property Uploader"
        intro="Add properties to the platform using our bulk uploader"
        metaData={{
          title: 'add a property to the platform',
          content: 'Add a property to the platform',
        }}
      />
      <PleaseSignIn
        currentUser={currentUser}
        message={pleaseSignInMessage}
        alert={
          <p>
            <strong>{pleaseSignInMessage}</strong>
          </p>
        }>
        <BulkUploader />
      </PleaseSignIn>
    </>
  );
};

BulkAddPropertyPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default BulkAddPropertyPage;
