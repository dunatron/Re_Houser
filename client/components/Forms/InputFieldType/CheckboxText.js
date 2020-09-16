import PropTypes from 'prop-types';
import React, { useState } from 'react';

import InputFieldType from './index';

//Material Components
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const CheckboxText = props => {
  const { label, inners, register } = props;
  const [checked, setChecked] = useState(false);

  const [displayInners, setDisplayInners] = useState(false);
  const handleChange = event => {
    // setState({ ...state, [event.target.name]: event.target.checked });
    setChecked(event.target.checked);
    setDisplayInners(event.target.checked);
  };

  const showInners = () => {
    if (inners && displayInners) return true;
    return false;
  };

  return (
    <>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              {...props}
              checked={checked}
              onChange={handleChange}
              name={props.name}
              // {...props}
            />
          }
          label={props.label}
        />
      </FormGroup>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              {...props}
              checked={checked}
              onChange={handleChange}
              name={props.name}
              // {...props}
            />
          }
          label={props.label}
        />
      </FormGroup>

      {showInners() &&
        inners.map((inner, idx) => (
          <InputFieldType
            {...props}
            fieldConf={inner.fieldConf}
            label={inner.label}
            defaultValue={inner.defaultValue}
            onChange={val => console.log('onOnCnage...', val)}
            key={idx}
            name={inner.name}
            inners={inner.inners}
            inputRef={register(inner.refConf)}
          />
        ))}
    </>
  );
};

CheckboxText.propTypes = {
  inners: PropTypes.shape({
    map: PropTypes.func
  }).isRequired,
  label: PropTypes.any.isRequired,
  name: PropTypes.any.isRequired,
  register: PropTypes.func.isRequired
};

export default CheckboxText;
