import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import CREATE_PROPERTY_FORM_CONF from '../../lib/configs/createPropertyForm';
import FormCreator from '../Forms/FormCreator';
import { Button } from '@material-ui/core';
import { SINGLE_OWNER_PROPERTY_QUERY } from '../../graphql/queries';

const EditPropertyForm = ({ propertyId }) => {
  const [edit, setEdit] = useState(true);

  const { data, loading, error } = useQuery(SINGLE_OWNER_PROPERTY_QUERY, {
    variables: {
      id: propertyId,
    },
  });

  const handleSetEditChange = () => {
    setEdit(!edit);
  };

  if (!edit)
    return <Button onClick={handleSetEditChange}>Edit Original Form</Button>;
  return (
    <FormCreator
      title="Property Form"
      data={data.ownerProperty ? data.ownerProperty : null}
      isNew={false}
      // posting={updateInsulationFormProps.loading}
      config={CREATE_PROPERTY_FORM_CONF}
      // data={{ wallCoverage: null }}
      //   onSubmit={handleSubmittedData}
    />
  );
};

export default EditPropertyForm;
