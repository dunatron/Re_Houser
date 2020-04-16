import React, { useState, useEffect } from 'react';
import FormCreator from '../FormCreator';

import { Paper, Switch } from '@material-ui/core';

const EntityFormType = props => {
  const { config, setValue, register } = props;
  const { formConf, resolveKey, refConf, required } = config;
  const [canBeFucked, setCanBeFucked] = useState();

  /**
   * ToDo: quite a bit, it neeeds to resolve its data to suplied key
   * passing in config but maybe not props it needs. maybe. because it should rightr
   */
  useEffect(() => {
    register({ name: resolveKey }, refConf);
  }, [register]);

  if (!formConf) return 'please supply a formConf object to that key';

  const submitEntityToLargerConcern = submittedFormData => {
    console.log('submitEntityToLargerConcern => ', submittedFormData);
    setValue(resolveKey, submittedFormData);
    // alert('check that submitted form data');
  };

  /**
   * ToDo: quite a bit, it neeeds to resolve its data to suplied key
   * passing in config but maybe not props it needs. maybe. because it should rightr
   */
  return (
    <Paper style={{ padding: '8px' }}>
      <p>Had to send ytour arse the real deal. Line EM up</p>
      <p>
        Note: should spend some quality time here. It should shut on submit.
        maybe display a jSON dump of data on request when submitted
      </p>
      {!required && (
        <p>Enitity is not required for current form so is closed by default</p>
      )}
      <Switch
        value={canBeFucked}
        onChange={() => setCanBeFucked(!canBeFucked)}
      />
      {canBeFucked && (
        <FormCreator
          config={formConf}
          // error={error}
          // posting={loading}
          // onSubmit={submitFormWithData}]
          onSubmit={submitEntityToLargerConcern}
        />
      )}
    </Paper>
  );
};

export default EntityFormType;
