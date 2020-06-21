import PropertyDetails from '../../../components/PropertyDetails/index';
import PleaseSignIn from '../../../components/PleaseSignIn';
import PageHeader from '../../../components/PageHeader';

const Item = props => {
  const {
    appData: { currentUser },
    query,
  } = props;

  return (
    <>
      {/* PageHeader is on this component */}
      <PleaseSignIn
        currentUser={currentUser}
        message="You must be signed in to manage this property">
        <PropertyDetails id={props.query.id} />
      </PleaseSignIn>
    </>
  );
};

export default Item;
