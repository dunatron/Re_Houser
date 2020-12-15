import FormCreator from '../Forms/FormCreator';
import { useMutation, gql } from '@apollo/client';
import { CREATE_INSPECTION_FORM_CONF } from '@/Lib/configs/forms/createInspection';

import makeInspectionForm from './makeInspectionForm';

export const CREATE_INSPECTION_MUTATION = gql`
  mutation CREATE_INSPECTION_MUTATION($data: InspectionCreateInput!) {
    createInspection(data: $data) {
      id
    }
  }
`;

const CreateInspection = ({ connectName, connectId, property }) => {
  const [createInspection, { data, loading, error }] = useMutation(
    CREATE_INSPECTION_MUTATION
  );
  return (
    <FormCreator
      config={CREATE_INSPECTION_FORM_CONF}
      posting={loading}
      error={error}
      onSubmit={d => {
        createInspection({
          variables: {
            data: {
              [connectName]: {
                connect: {
                  id: connectId,
                },
              },
              ...d,
              inspectionForm: {
                create: {
                  json: makeInspectionForm(property),
                },
              },
            },
          },
        });
      }}
    />
  );
};

export default CreateInspection;
