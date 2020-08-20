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

export default InspectionsTab;
