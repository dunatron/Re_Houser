// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import MaskedInput from 'react-text-mask';
// import NumberFormat from 'react-number-format';
// import { makeStyles } from '@material-ui/core/styles';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import TextField from '@material-ui/core/TextField';
// import FormControl from '@material-ui/core/FormControl';
// import OutlinedInput from '@material-ui/core/OutlinedInput';

// import FieldError from './FieldError';

// function TextMaskCustom(props) {
//   const { inputRef, ...other } = props;

//   return (
//     <MaskedInput
//       {...other}
//       ref={ref => {
//         inputRef(ref ? ref.inputElement : null);
//       }}
//       mask={[
//         '(',
//         /[0-9]/,
//         /\d/,
//         /\d/,
//         ')',
//         ' ',
//         /\d/,
//         /\d/,
//         /\d/,
//         '-',
//         /\d/,
//         /\d/,
//         /\d/,
//         /\d/,
//       ]}
//       placeholderChar={'\u2000'}
//       showMask
//     />
//   );
// }

// const useStyles = makeStyles(theme => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
// }));

// const PhoneInput = props => {
//   const [maskVal, setMaskVal] = useState('(0  )    -    ');

//   const {
//     config,
//     onChange,
//     register,
//     errors,
//     getValues,
//     setValue,
//     reset,
//     defaultValues,
//     defaultValue,
//     updateCacheOnRemovedFile,
//     fieldError,
//     extractErrorFromErrors,
//   } = props;
//   const { type, fieldProps, refConf } = config;
//   const name = fieldProps ? fieldProps.name : null;
//   const label = fieldProps ? fieldProps.label : null;

//   const handleChange = event => {
//     setMaskVal(event.target.value);
//   };

//   register({ name: fieldProps.name }, refConf);

//   return (
//     <FormControl variant="outlined">
//       <InputLabel htmlFor={name}>{label}</InputLabel>
//       <OutlinedInput
//         id={name}
//         inputRef={register ? register(refConf) : null}
//         value={maskVal}
//         onChange={handleChange}
//         label={label}
//         inputComponent={TextMaskCustom}
//         {...fieldProps}
//       />
//       <FieldError errors={errors} name={name} />
//     </FormControl>
//   );
// };

// export default PhoneInput;

import PhoneInput from '../../Inputs/PhoneInput';

// ToDo: setup the form stuff with phone input field
// probably easisit to manually register and update as needed
const Phone = ({
  config,
  onChange,
  register,
  errors,
  getValues,
  setValue,
  reset,
  defaultValues,
  defaultValue,
  updateCacheOnRemovedFile,
  fieldError,
  extractErrorFromErrors,
}) => {
  return (
    <PhoneInput
      onChange={v => {
        console.log('Form input phone change => ', v);
      }}
    />
  );
};

export default Phone;
