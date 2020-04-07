import OwnerProperties from '../../components/OwnerProperties/index';
import PleaseSignIn from '../../components/PleaseSignIn';

const PropertiesPage = props => {
  const {
    appData: { currentUser },
  } = props;
  const pleaseSignInMessage =
    'You must be signed in to manager your properties';
  return (
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
  );
};

export default PropertiesPage;
