import PropTypes from "prop-types";
import InspectionsTable from '../Tables/InspectionsTable';
import CreateInspection from '../Inspections/CreateInspection';

const InspectionsTab = ({ property, me }) => {
  return (
    <>
      <h3>ToDo: ability to create an inspection</h3>
      <CreateInspection />
      <InspectionsTable />
    </>
  );
};

InspectionsTab.propTypes = {
  me: PropTypes.any.isRequired,
  property: PropTypes.any.isRequired
}

export default InspectionsTab;
