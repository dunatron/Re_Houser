// import PropertyDetails from "../../components/PropertyDetails/index"
import LeasesList from '../../components/LeasesList';
import PleaseSignIn from '../../components/PleaseSignIn';

const MyLeasePage = props => {
  const {
    appData: { currentUser },
  } = props;
  return (
    <div>
      <PleaseSignIn
        currentUser={currentUser}
        message="You cannot view a lease without being signed in">
        <LeasesList />
      </PleaseSignIn>
    </div>
  );
};
export default MyLeasePage;
