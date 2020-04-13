import React from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { INSULATION_FORM_QUERY } from '../../../graphql/queries';
import { UPDATE_INSULATION_FORM_MUTATION } from '../../../graphql/mutations';
import Errors from '../../ErrorMessage';

import FormCreator from '../FormCreator';
import INSULATION_FORM_FIELDS_CONFIG from './fieldsConf';

import { Paper, Typography } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/AssignmentOutlined';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import EditIcon from '@material-ui/icons/Edit';

const InsulationStatementForm = ({ insulationFormId, propertyId }) => {
  return (
    <Paper>
      <AssignmentIcon />
      <Typography>Insulation Statement</Typography>
      <AddIcon onClick={() => alert('ToDo: Add Insulation Form')} />
      <EditIcon onClick={() => alert('ToDo: Edit Insulation Form')} />
      <RemoveIcon onClick={() => alert('ToDo: Remove Insulation Form')} s />
      {/* <h1>I am the form manager</h1>
      <p>insulationFormId{insulationFormId}</p>
      <p>propertyId{propertyId}</p> */}
      {/* <FormCreator
        title="Insulation Form"
        data={data.insulationForm}
        isNew={propertyId ? false : true}
        posting={updateInsulationFormProps.loading}
        config={INSULATION_FORM_FIELDS_CONFIG}
        // data={{ wallCoverage: null }}
        onSubmit={data => {
          console.log('Why would this data not update? => ', data);
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
        }}
      /> */}
    </Paper>
  );
};

// const InsulationStatementForm = ({ insulationFormId, propertyId }) => {
//   //   if (!insulationFormId) return null;

//   const [loadInsulationForm, { called, loading, data }] = useLazyQuery(
//     INSULATION_FORM_QUERY,
//     {
//       variables: {
//         where: {
//           id: insulationFormId,
//         },
//       },
//     }
//   );

//   const [updateInsulationForm, updateInsulationFormProps] = useMutation(
//     UPDATE_INSULATION_FORM_MUTATION
//   );

//   if (called && loading) return <p>Loading ...</p>;
//   if (!called && insulationFormId) {
//     return (
//       <>
//         <p>insulationFormId{insulationFormId}</p>
//         <p>propertyId{propertyId}</p>
//         <p>You have an Insulation Form</p>
//         <button onClick={() => loadInsulationForm()}>
//           Edit Insulation STatement Form
//         </button>
//       </>
//     );
//   }
//   // if (!data) return 'Couldnt fetch data';
//   //   return <h1>Hello {data ? data.insulationForm.id : 'Ahem'}!</h1>;

//   // if no InsualtionFormId
//   if(!insulationFormId)

//   return (
//     <div>
//       <h1>I am the form manager</h1>
//       <p>insulationFormId{insulationFormId}</p>
//       <p>propertyId{propertyId}</p>
//       <Errors error={updateInsulationFormProps.errors} />
//       <FormCreator
//         title="Insulation Form"
//         data={data.insulationForm}
//         isNew={propertyId ? false : true}
//         posting={updateInsulationFormProps.loading}
//         config={INSULATION_FORM_FIELDS_CONFIG}
//         // data={{ wallCoverage: null }}
//         onSubmit={data => {
//           console.log('Why would this data not update? => ', data);
//           updateInsulationForm({
//             variables: {
//               where: {
//                 id: insulationFormId,
//               },
//               data: {
//                 ...data,
//               },
//             },
//           });
//           // setState({
//           //   ...state,
//           //   insulationForm: {
//           //     ...data,
//           //   },
//           // });
//           // setCompleteInsulationLater(true);
//         }}
//       />
//     </div>
//   );
// };

export { InsulationStatementForm };
export default InsulationStatementForm;
