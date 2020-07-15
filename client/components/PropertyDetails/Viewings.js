import Viewings from '../Viewings';

const PropertyViewings = ({ propertyId, me }) => {
  return (
    <div>
      <Viewings
        propertyId={propertyId}
        me={me}
        where={{
          property: {
            id: propertyId,
          },
        }}
      />
    </div>
  );
};

export default PropertyViewings;
