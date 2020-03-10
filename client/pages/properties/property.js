import PropertyDetails from '../../components/PropertyDetails/index';
import PleaseSignIn from '../../components/PleaseSignIn';

const Item = props => (
  <PleaseSignIn message="You must be signed in to manage this property">
    <PropertyDetails id={props.query.id} />
  </PleaseSignIn>
);

export default Item;
