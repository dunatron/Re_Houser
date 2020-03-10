// import PropertyDetails from "../../components/PropertyDetails/index"
import LeasesList from '../../components/LeasesList';
import PleaseSignIn from '../../components/PleaseSignIn';

const SocialPage = props => (
  <div>
    <PleaseSignIn message="You cannot view the social without being signed in">
      <h1>This is the social dashboard</h1>
    </PleaseSignIn>
  </div>
);

export default SocialPage;
