import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import CREATE_PROPERTY_FORM_CONF from '@/Lib/configs/createPropertyForm';
import FormCreator from '@/Components/Forms/FormCreator';
import { Button } from '@material-ui/core';
import { SINGLE_OWNER_PROPERTY_QUERY } from '@/Gql/queries';
import Loader from '@/Components/Loader';
import Error from '@/Components/ErrorMessage';

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

  if (loading)
    return <Loader loading={loading} text="Loading data into form" />;

  if (error) return <Error error={error} />;

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
      onSubmit={data => {
        alert('ToDo: allow update property trhough add property form ');
      }}
    />
  );
};

EditPropertyForm.propTypes = {
  propertyId: PropTypes.any,
};

export default EditPropertyForm;
