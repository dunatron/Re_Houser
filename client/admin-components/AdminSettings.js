import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { FormControlLabel, Switch, Button } from '@material-ui/core';
// mutation
import { UPDATE_USER_MUTATION } from '../graphql/mutations';

const AdminSettings = ({ me }) => {
  const { adminSettings } = me;
  const [state, setState] = useState({
    appraisalCreatedSub: adminSettings
      ? adminSettings.appraisalCreatedSub
      : false,
  });
  console.log('Admin Settings me => ', me);

  const [updateUser, { loading, error, data }] = useMutation(
    UPDATE_USER_MUTATION,
    {
      variables: {
        data: {
          adminSettings: adminSettings
            ? {
                update: {
                  ...state,
                },
              }
            : {
                create: {
                  ...state,
                },
              },
        },
      },
    }
  );

  console.log('updateUser data => ', data);

  const handleChange = e => {
    console.log('e => ', e);
    console.log('e.target.checked => ', e.target.checked);
    console.log('E.name => ', e.name);
    console.log('E.target.name => ', e.target.name);
    setState({
      ...state,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <div>
      <h2>Admin Settings mutations etc</h2>
      <FormControlLabel
        control={
          <Switch
            checked={state.appraisalCreatedSub}
            onChange={handleChange}
            name="appraisalCreatedSub"
            color="primary"
          />
        }
        label="Primary"
      />
      <Button
        onClick={() => {
          updateUser();
        }}>
        UPDATER
      </Button>
    </div>
  );
};

export default AdminSettings;
