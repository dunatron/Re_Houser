import PropTypes from 'prop-types';
import OwnerProperties from '@/Components/OwnerProperties/index';
import PleaseSignIn from '@/Components/PleaseSignIn';
import PageHeader from '@/Components/PageHeader';
import { Typography } from '@material-ui/core';

const PropertiesPage = ({ appData: { currentUser } }) => {
  const pleaseSignInMessage =
    'You must be signed in to manager your properties';

  const me = currentUser.data ? currentUser.data.me : null;
  return (
    <>
      <PageHeader
        title="My Properties"
        intro="Here is the portal to your properties, you can get a quick overview etc etc and add a property with the add property button"
        children={[
          <Typography key={1} gutterBottom>
            Maybe something else to say
          </Typography>,
        ]}
        metaData={{
          title: 'My Properties',
          content: 'The properties for the current logged in user',
        }}
      />
      <PleaseSignIn
        currentUser={currentUser}
        message={pleaseSignInMessage}
        alert={
          <Typography variant="body1" gutterBottom color="inherit">
            <Typography component="strong">{pleaseSignInMessage}</Typography>
          </Typography>
        }>
        <OwnerProperties me={me} />
      </PleaseSignIn>
    </>
  );
};

PropertiesPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default PropertiesPage;
