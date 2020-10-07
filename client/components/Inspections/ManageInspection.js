// gql
import { useQuery } from '@apollo/client';
import { SINGLE_INSPECTION_QUERY } from '@/Gql/queries';

import Loader from '@/Components/Loader';
import Error from '@/Components/ErrorMessage';
import DisplayJson from '@/Components/DisplayJson';
import FormCreator from '@/Components/Forms/FormCreator';

import RehouserPaper from '@/Styles/RehouserPaper';

const ManageInspection = ({ id }) => {
  const { data, loading, error } = useQuery(SINGLE_INSPECTION_QUERY, {
    variables: {
      where: {
        id: id,
      },
    },
  });
  // 1. get the id param in the url it will be the inspection id to get the inspection
  // 2. It will then show a view for admins allowing them to update the notes or complete the inspection
  // 3. an inspection will have an array inspectionForms which can have a form for each person
  // will have a variable called submittedForms [InspectionForm] we could have the inspection when created holding the form structure inspectionForm
  // then we can use that to go over and create the form to be submitted
  if (error) return <Error error={error} />;
  if (loading) return <Loader loading={loading} text="Loading inspection" />;

  const inspection = data.inspection;

  if (!inspection) return <div>No inspection to be found here</div>;

  return (
    <div>
      <DisplayJson title="Inspection Data" json={data} />
      <RehouserPaper>
        <FormCreator
          title="inspection"
          config={inspection.inspectionForm.json}
          onSubmit={data => {
            console.log('inspection inspectionForm Data => ', data);
            alert('ToDo: handle inspection inspectionForm');
          }}
        />
      </RehouserPaper>
    </div>
  );
};

export default ManageInspection;
