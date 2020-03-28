import React from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { INSULATION_FORM_QUERY } from '../../../graphql/queries';
import { UPDATE_INSULATION_FORM_MUTATION } from '../../../graphql/mutations';

import { InsulationStatementForm } from './index';

const InsulationStatementFormManager = ({ insulationFormId, propertyId }) => {
  //   if (!insulationFormId) return null;

  const [loadInsulationForm, { called, loading, data }] = useLazyQuery(
    INSULATION_FORM_QUERY,
    {
      variables: {
        where: {
          id: insulationFormId,
        },
      },
    }
  );

  const [updateInsulationForm, updateInsulationFormProps] = useMutation(
    UPDATE_INSULATION_FORM_MUTATION
  );

  if (called && loading) return <p>Loading ...</p>;
  if (!called && insulationFormId) {
    return (
      <>
        <p>insulationFormId{insulationFormId}</p>
        <p>propertyId{propertyId}</p>
        <p>You have an Insulation Form</p>
        <button onClick={() => loadInsulationForm()}>
          Edit Insulation STatement Form
        </button>
      </>
    );
  }
  if (!data) return 'Couldnt fetch data';
  //   return <h1>Hello {data ? data.insulationForm.id : 'Ahem'}!</h1>;

  return (
    <div>
      <h1>I am the form manager</h1>
      <p>insulationFormId{insulationFormId}</p>
      <p>propertyId{propertyId}</p>
      <InsulationStatementForm
        data={data.insulationForm}
        // data={{ wallCoverage: null }}
        onSubmit={data => {
          updateInsulationForm({
            variables: {
              where: {
                id: insulationFormId,
              },
              data: {
                ...data,
              },
            },
          });
          // setState({
          //   ...state,
          //   insulationForm: {
          //     ...data,
          //   },
          // });
          // setCompleteInsulationLater(true);
        }}
      />
    </div>
  );
};

export { InsulationStatementFormManager };
export default InsulationStatementFormManager;
