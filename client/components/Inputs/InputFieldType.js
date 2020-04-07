import React, { useState } from 'react';
import TextInput from './TextInput';
import SwitchInput from './SwitchInput';
import DateInput from './DateInput';

//Material Components
import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

// const setAndFormatMoveInDate = date => {
//   setMoveInDate(date);
//   setMoveInDateStamp(moment(date).unix());
// };

const CheckReason = props => {
  const { label, inners, register } = props;
  const [value, setValue] = React.useState('');
  const [displayInners, setDisplayInners] = useState(false);
  const handleChange = event => {
    setValue(event.target.value);
    setDisplayInners(event.target.value === 'NO');
  };

  const showInners = () => {
    if (inners && displayInners) return true;
    return false;
  };

  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          onChange={handleChange}
          style={{ display: 'flex', flexDirection: 'row' }}>
          <FormControlLabel value="YES" control={<Radio />} label="Yes" />
          <FormControlLabel value="NO" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      {showInners() &&
        inners.map((inner, idx) => (
          <InputFieldType
            fieldConf={inner.fieldConf}
            label={inner.label}
            defaultValue={inner.defaultValue}
            onChange={val => console.log('onOnCnage...', val)}
            key={idx}
            name={inner.name}
            inners={inner.inners}
            errorMessage={inner.errorMessage}
            errors={props.errors}
            inputRef={register(inner.refConf)}
          />
        ))}
    </>
  );
};

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

      {showInners() &&
        inners.map((inner, idx) => (
          <InputFieldType
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

const InputFieldType = props => {
  // const { onChange, errors, errorMessage, name, fieldProps } = props;
  const { config, onChange } = props;
  const { type, label, fieldProps } = config;
  switch (type) {
    case 'Header':
      // return <TextInput {...props} onChange={e => onChange(e.target.value)} />;
      return <h1>{props.label}</h1>;
    case 'Subheader':
      return <h3>{props.label}</h3>;
    case 'String':
      // return <TextInput {...props} onChange={e => onChange(e.target.value)} />;
      return (
        <>
          <TextInput
            // {...props}
            {...fieldProps}
            error={props.errors[props.name]}
            helperText={
              props.errors[props.name] ? props.errorMessage : undefined
            }
            multiline
            rowsMax="6"
            onChange={e => onChange(e.target.value)}
          />
          {props.errors[props.name] && props.errorMessage}
        </>
        // {errors[item.name] && item.errorMessage}
      );
    case 'CheckReason':
      return <CheckReason {...props} />;
    case 'CheckboxText':
      return <CheckboxText {...props} />;

    case 'Boolean':
      return (
        <FormControlLabel
          control={<Switch {...props} aria-label="LoginSwitch" />}
          label={props.label}
        />
      );
    case 'Int':
      return (
        <TextInput
          type="number"
          {...props}
          onChange={e => onChange(parseInt(e.target.value))}
        />
      );
    case 'Float':
      return (
        <TextInput
          type="number"
          {...props}
          onChange={e => onChange(parseFloat(e.target.value))}
        />
      );
    case 'DateTime':
      return (
        <TextInput
          {...props}
          helperText
          type="datetime-local"
          InputLabelProps={{
            shrink: true,
          }}
        />
      );
    default:
      return <TextInput {...props} onChange={e => onChange(e.target.value)} />;
  }
};
export default InputFieldType;
