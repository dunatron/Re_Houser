import OwnerProperties from '../../components/OwnerProperties/index';
import PleaseSignIn from '../../components/PleaseSignIn';

const PropertiesPage = props => {
  const pleaseSignInMessage =
    'You must be signed in to manager your properties';
  return (
    <PleaseSignIn
      message={pleaseSignInMessage}
      alert={
        <p>
          <strong>{pleaseSignInMessage}</strong>
        </p>
      }>
      <OwnerProperties />
    </PleaseSignIn>
  );
};

export default PropertiesPage;
