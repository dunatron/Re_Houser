import OwnerProperties from '../../components/OwnerProperties/index';
import PleaseSignIn from '../../components/PleaseSignIn';
import PageHeader from '../../components/PageHeader';
import { Typography } from '@material-ui/core';

const PropertiesPage = props => {
  const {
    appData: { currentUser },
  } = props;
  const pleaseSignInMessage =
    'You must be signed in to manager your properties';
  return (
    <>
      <PageHeader
        title="Properties"
        intro="Here is the portal to your properties, you can get a quick overview etc etc and add a property with the add property button"
        children={[<Typography>Maybe something else to say</Typography>]}
        metaData={{
          title: 'Properties',
          content: 'The properties for the current logged in user',
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
        <OwnerProperties me={props.me ? props.me : null} />
      </PleaseSignIn>
    </>
  );
};

export default PropertiesPage;
