import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react';
import FormCreator from '../FormCreator';

import { Paper, Switch, Typography } from '@material-ui/core';

const EntityFormType = props => {
  const { config, setValue, register } = props;
  const {
    title,
    description,
    formConf,
    resolveKey,
    refConf,
    required,
  } = config;
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
    setValue(resolveKey, submittedFormData);
    // alert('check that submitted form data');
  };

  /**
   * ToDo: quite a bit, it neeeds to resolve its data to suplied key
   * passing in config but maybe not props it needs. maybe. because it should rightr
   */
  return (
    <Paper style={{ padding: '8px' }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography>{description}</Typography>
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

EntityFormType.propTypes = {
  config: PropTypes.any.isRequired,
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired
}

export default EntityFormType;
