// import PropertyDetails from "../../components/PropertyDetails/index"
import LeasesList from '../../components/LeasesList';
import PleaseSignIn from '../../components/PleaseSignIn';
import PageHeader from '../../components/PageHeader';

const MyLeasePage = props => {
  const {
    appData: { currentUser },
  } = props;

  return (
    <>
      <PageHeader
        title="Your Leases"
        intro="This is where you can manage and review any leases you are involved in"
        metaData={{
          title: 'leases',
          content: 'Review and edit and leases the current user is onvolved in',
        }}
      />
      <PleaseSignIn
        currentUser={currentUser}
        message="You cannot view a lease without being signed in">
        <LeasesList />
      </PleaseSignIn>
    </>
  );
};
export default MyLeasePage;
