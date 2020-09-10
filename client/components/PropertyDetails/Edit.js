import PropTypes from "prop-types";
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import CREATE_PROPERTY_FORM_CONF from '../../lib/configs/createPropertyForm';
import FormCreator from '../Forms/FormCreator';
import { Button } from '@material-ui/core';
import { SINGLE_OWNER_PROPERTY_QUERY } from '../../graphql/queries';
import Loader from '../Loader';
import Error from '../ErrorMessage';

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
        console.log('UPdate propert form data => ', data);
        alert('ToDo: allow update property trhough add property form ');
      }}
    />
  );
};

EditPropertyForm.propTypes = {
  propertyId: PropTypes.any.isRequired
}

export default EditPropertyForm;
