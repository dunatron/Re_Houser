import PropertyDetails from '../../components/PropertyDetails/index';

const Item = props => (
  <div>
    <PropertyDetails id={props.query.id} />
  </div>
);

export default Item;
