// import PropertyDetails from "../../components/PropertyDetails/index"
import FriendManager from '../../components/FriendManager/index';
import PleaseSignIn from '../../components/PleaseSignIn';

const MyLeasePage = props => {
  const {
    appData: { currentUser },
  } = props;
  return (
    <div>
      <PleaseSignIn
        currentUser={currentUser}
        message="You must be signed in to manager your friends">
        <FriendManager />
      </PleaseSignIn>
    </div>
  );
};

export default MyLeasePage;
