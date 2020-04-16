import React from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { INSULATION_FORM_QUERY } from '../../../graphql/queries';
import { UPDATE_INSULATION_FORM_MUTATION } from '../../../graphql/mutations';
import Errors from '../../ErrorMessage';

import FormCreator from '../FormCreator';
import { INSULATION_STATEMENT_FORM_CONF } from '../../../lib/configs/insulationStatementForm';

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

export { InsulationStatementForm };
export default InsulationStatementForm;
