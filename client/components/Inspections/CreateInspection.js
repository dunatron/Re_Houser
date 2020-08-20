import FormCreator from '../Forms/FormCreator';
import { useMutation, gql } from '@apollo/client';
import { CREATE_INSPECTION_FORM_CONF } from '../../lib/configs/forms/createInspection';
import Error from '../ErrorMessage';

export const CREATE_INSPECTION_MUTATION = gql`
  mutation CREATE_INSPECTION_MUTATION($data: InspectionCreateInput!) {
    createInspection(data: $data) {
      id
    }
  }
`;

const CreateInspection = () => {
  const [createInspection, { data, loading, error }] = useMutation(
    CREATE_INSPECTION_MUTATION
  );
  return (
    <div>
      I will handle creating an inspection if you give me a couply props
      <FormCreator
        config={CREATE_INSPECTION_FORM_CONF}
        posting={loading}
        error={error}
        onSubmit={d => {
          alert('CHECK CONSOLE');
          console.log('Your data => ', d);
          createInspection({
            variables: {
              data: {
                ...d,
              },
            },
          });
        }}
      />
    </div>
  );
};

export default CreateInspection;
