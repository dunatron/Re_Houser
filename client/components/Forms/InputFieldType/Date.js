// import PropTypes from 'prop-types';
// import React from 'react';
// import TextInput from '../../Inputs/TextInput';

// const DateField = props => {
//   const { config, register, fieldError } = props;
//   const { fieldProps, refConf } = config;
//   return (
//     <TextInput
//       variant="outlined"
//       {...fieldProps}
//       type={'date'}
//       inputRef={register(refConf)}
//       style={{ marginTop: 0 }}
//       error={fieldError ? true : false}
//       helperText={fieldError}
//       InputLabelProps={{
//         shrink: true,
//       }}
//     />
//   );
// };

// DateField.propTypes = {
//   config: PropTypes.any.isRequired,
//   fieldError: PropTypes.any.isRequired,
//   register: PropTypes.func.isRequired,
// };

// export default DateField;

import PropTypes from 'prop-types';
import React from 'react';
import TextInput from '../../Inputs/TextInput';
import DatePicker from '@/Components/Pickers/DatePicker';

const DateField = props => {
  const { config, register, fieldError, clearError } = props;
  const { fieldProps, refConf } = config;

  const handleDateChange = date => {
    if (fieldError) {
      clearError(fieldProps.name);
    }
  };

  return (
    <DatePicker
      inputVariant={fieldProps.variant ? fieldProps.variant : 'outlined'}
      label={fieldProps.label}
      format="MMMM Do YYYY"
      minDate={fieldProps.minDate}
      maxDate={fieldProps.maxDate}
      inputProps={{
        name: fieldProps.name,
        id: fieldProps.name,
        ref: register(refConf),
      }}
      error={fieldError ? true : false}
      helperText={fieldError}
      onChange={handleDateChange}
    />
  );
};

DateField.propTypes = {
  config: PropTypes.any.isRequired,
  fieldError: PropTypes.any.isRequired,
  register: PropTypes.func.isRequired,
};

export default DateField;
