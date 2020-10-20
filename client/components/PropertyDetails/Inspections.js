import PropTypes from 'prop-types';
import InspectionsTable from '@/Components/Tables/InspectionsTable';
import CreateInspection from '@/Components/Inspections/CreateInspection';

const InspectionsTab = ({ property, me }) => {
  return (
    <>
      <h3>ToDo: ability to create an inspection</h3>
      <CreateInspection
        connectName="property"
        connectId={property.id}
        property={property}
      />
      <InspectionsTable
        where={{
          property: {
            id: property.id,
          },
        }}
      />
    </>
  );
};

InspectionsTab.propTypes = {
  me: PropTypes.any,
  property: PropTypes.any,
};

export default InspectionsTab;
