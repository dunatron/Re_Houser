import PropTypes from 'prop-types';
import LeasesList from '../../components/LeasesList';
import PleaseSignIn from '../../components/PleaseSignIn';
import PageHeader from '../../components/PageHeader';

const LeasesListPage = ({ appData: { currentUser } }) => {
  return (
    <>
      <PageHeader
        title="Your Leases"
        intro="This is where you can manage and review any leases you are involved in"
        metaData={{
          title: 'Leases',
          content: 'Review and edit and leases the current user is involved in',
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

LeasesListPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default LeasesListPage;
