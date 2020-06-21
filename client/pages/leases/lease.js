// import PropertyDetails from "../../components/PropertyDetails/index"
import LeaseManager from '../../components/LeaseManager/index';
import PleaseSignIn from '../../components/PleaseSignIn';

const MyLeasePage = props => {
  const {
    appData: { currentUser },
  } = props;
  return (
    <div>
      {/* PageHeader on LeaseManager component*/}
      <PleaseSignIn
        currentUser={currentUser}
        message="You cannot view a lease without being signed in">
        <LeaseManager leaseId={props.query.id} />
      </PleaseSignIn>
    </div>
  );
};

export default MyLeasePage;
