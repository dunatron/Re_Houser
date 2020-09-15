import PropTypes from 'prop-types';
import Viewings from '@/Components/Viewings';

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

PropertyViewings.propTypes = {
  me: PropTypes.any.isRequired,
  propertyId: PropTypes.any.isRequired,
};

export default PropertyViewings;
