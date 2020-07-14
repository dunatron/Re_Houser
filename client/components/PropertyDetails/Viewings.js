import CreateViewing from '../CreateViewing';
import ViewingsTable from '../ViewingsTable';
import Viewings from '../Viewings';

const PropertyViewings = ({ propertyId, me }) => {
  return (
    <div>
      <h3>I will handle viewings</h3>

      <Viewings
        propertyId={propertyId}
        where={{
          property: {
            id: propertyId,
          },
        }}
      />
      <CreateViewing propertyId={propertyId} me={me} />
      {/* <ViewingsTable where={{}} /> */}
    </div>
  );
};

export default PropertyViewings;
