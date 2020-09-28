import { useState } from 'react';
import { Typography, Button } from '@material-ui/core';
import FormCreator from '@/Components/Forms/FormCreator';
import REFEREE_FORM_CONF from '@/Lib/configs/forms/refereeForm';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_MUTATION } from '@/Gql/mutations/index';

const AddReferee = () => {
  const [adding, setAdding] = useState();

  const [updateUser, { error, loading }] = useMutation(UPDATE_USER_MUTATION);

  const toggleAdding = () => setAdding(!adding);

  const handleSubmit = data => {
    console.log('REFEREE FORM DATA => ', data);
    updateUser({
      variables: {
        data: {
          referees: {
            create: {
              ...data,
            },
          },
        },
        where: {},
      },
    });
  };

  return (
    <div>
      <Button onClick={toggleAdding}>
        {adding ? 'Cancel' : 'Add Referee'}
      </Button>
      {adding && (
        <FormCreator
          title="Add Referee Form"
          posting={loading}
          error={error}
          hasCancel
          cancel={toggleAdding}
          isNew={true}
          config={REFEREE_FORM_CONF}
          createText="Add Referee"
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default AddReferee;
