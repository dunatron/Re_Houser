import PropertyDetails from '../../components/PropertyDetails/index';
import PleaseSignIn from '../../components/PleaseSignIn';

const Item = props => {
  const {
    appData: { currentUser },
    query,
  } = props;
  return (
    <PleaseSignIn
      currentUser={currentUser}
      message="You must be signed in to manage this property">
      <PropertyDetails id={props.query.id} />
    </PleaseSignIn>
  );
};

export default Item;
