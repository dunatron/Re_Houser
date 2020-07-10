import CreateViewing from '../CreateViewing';
import ViewingsTable from '../ViewingsTable';

const PropertyViewings = ({ propertyId, me }) => {
  return (
    <div>
      <h3>I will handle viewings</h3>
      <CreateViewing propertyId={propertyId} me={me} />
      <ViewingsTable where={{}} />
    </div>
  );
};

export default PropertyViewings;
