import RentalApplications from '../../components/RentalApplications.js/index';
import PleaseSignIn from '../../components/PleaseSignIn';
import PageHeader from '../../components/PageHeader';

const RentalApplicationsPage = props => {
  const {
    appData: { currentUser },
  } = props;
  return (
    <div>
      <PageHeader
        title="Your Applications"
        intro="This is where you can manage and review any rental applications you are involved in"
        metaData={{
          title: 'Rental applications',
          content: 'Rental applications the current user is involved in',
        }}
      />
      <PleaseSignIn
        currentUser={currentUser}
        message="You must be signed in to manager your applications">
        <RentalApplications />
      </PleaseSignIn>
    </div>
  );
};

export default RentalApplicationsPage;
