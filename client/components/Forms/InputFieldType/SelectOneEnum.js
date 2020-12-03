import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Select,
  InputLabel,
  FormHelperText,
  FormControl,
  MenuItem,
  TextField,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { GET_ENUM_QUERY } from '../../../graphql/queries';
import Error from '../../ErrorMessage';
import Loader from '../../Loader';
import FieldError from './FieldError';
import { is } from 'ramda';
import InputFieldType from './index';
import useStyles from '@/Components/Forms/useStyles';

// experimental
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function SimpleSelect(props) {
  const classes = useStyles();
  const {
    __type,
    values,
    getValues,
    label,
    selectID,
    handleChange,
    removeItem,
    register,
    unregister,
    config,
    setValue, // is from useForm
    reset,
    errors,
    defaultValues,
    helperText,
    fieldError,
    clearError,
  } = props;
  const { type, inners, fieldProps, refConf } = config;
  const name = fieldProps ? fieldProps.name : null;

  const yuckErr = name ? errors[name] : null; //thats why I labelled it yuck, shold work with architecture right.. .SO check this out wehen you have time

  const defaultValue = defaultValues[fieldProps.name];
  const { data, error, loading } = useQuery(GET_ENUM_QUERY, {
    variables: {
      name: __type,
    },
  });

  const [currVal, setCurrVal] = useState(
    is(Array, defaultValue) ? defaultValue : []
  );

  useEffect(() => {
    register({ name: fieldProps.name }, refConf);
    if (defaultValue) {
      // setValue(fieldProps.name, 'TOWNHOUSE');
      setValue(fieldProps.name, defaultValue);
    }
    return () => {
      clearError(fieldProps.name);
      unregister(fieldProps.name);
    };
  }, [fieldProps, defaultValue]);

  if (!fieldProps) return 'This form component needs fieldProps';

  if (error) return <Error error={error} />;

  const options = data
    ? data.__type.enumValues.map((v, i) => ({
        name: v.name,
        value: v.name,
      }))
    : [];

  const resolveShowOnParentVals = (config, inner) => {
    if (inner.parentShowVals.includes(currVal)) {
      return true;
    }
    return false;
  };

  const canDisplayInner = (config, inner) => {
    if (inner.parentShowVals) return resolveShowOnParentVals(config, inner);
    return true;
  };

  const handleOnValueChange = (event, valueObj, reason) => {
    if (valueObj) {
      setCurrVal(valueObj.value);
      setValue(fieldProps.name, valueObj.value);
      clearError(fieldProps.name);
    } else {
      setValue(fieldProps.name, null);
    }
  };

  return (
    <>
      <Autocomplete
        style={{ marginBottom: '16px' }}
        id={`${selectID}-label`}
        loading={loading}
        variant={fieldProps.variant ? fieldProps.variant : 'outlined'}
        options={options}
        defaultValue={defaultValue} // probably wont work
        getOptionLabel={option => option.name}
        getOptionSelected={(option, value) => option.value === value.value}
        // style={{ width: 300 }}
        onChange={handleOnValueChange}
        renderInput={params => (
          <TextField
            {...params}
            {...fieldProps}
            error={fieldError ? true : false}
            label={fieldProps.label}
            variant="outlined"
            helperText={fieldError}
          />
        )}
      />
      {inners &&
        inners.map((inner, idx) => {
          if (!canDisplayInner(config, inner)) return null;
          return (
            <div key={inner.key} style={{ marginTop: '16px' }}>
              <InputFieldType
                {...props}
                config={inner}
                key={idx}
                register={register}
                errors={errors}
                setValue={setValue}
                reset={reset}
                defaultValues={defaultValues}
              />
            </div>
          );
        })}
    </>
  );
}

SimpleSelect.propTypes = {
  __type: PropTypes.any,
  clearError: PropTypes.func.isRequired,
  config: PropTypes.shape({
    key: PropTypes.any,
  }).isRequired,
  defaultValues: PropTypes.any,
  errors: PropTypes.any,
  fieldError: PropTypes.any,
  getValues: PropTypes.any,
  handleChange: PropTypes.any,
  helperText: PropTypes.any,
  label: PropTypes.any,
  register: PropTypes.func.isRequired,
  removeItem: PropTypes.any,
  reset: PropTypes.any,
  selectID: PropTypes.any,
  setValue: PropTypes.func.isRequired,
  values: PropTypes.any,
};

// import PropTypes from 'prop-types';
// import React, { useEffect, useState } from 'react';
// import {
//   Select,
//   InputLabel,
//   FormHelperText,
//   FormControl,
//   MenuItem,
// } from '@material-ui/core';
// import { useQuery } from '@apollo/client';
// import { GET_ENUM_QUERY } from '../../../graphql/queries';
// import Error from '../../ErrorMessage';
// import Loader from '../../Loader';
// import FieldError from './FieldError';
// import { is } from 'ramda';
// import InputFieldType from './index';
// import useStyles from '@/Components/Forms/useStyles';

// export default function SimpleSelect(props) {
//   const classes = useStyles();
//   const {
//     __type,
//     values,
//     getValues,
//     label,
//     selectID,
//     handleChange,
//     removeItem,
//     register,
//     unregister,
//     config,
//     setValue, // is from useForm
//     reset,
//     errors,
//     defaultValues,
//     helperText,
//     fieldError,
//     clearError,
//   } = props;
//   const { type, inners, fieldProps, refConf } = config;
//   const name = fieldProps ? fieldProps.name : null;

//   const yuckErr = name ? errors[name] : null; //thats why I labelled it yuck, shold work with architecture right.. .SO check this out wehen you have time

//   const defaultValue = defaultValues[fieldProps.name];
//   const { data, error, loading } = useQuery(GET_ENUM_QUERY, {
//     variables: {
//       name: __type,
//     },
//   });

//   const [currVal, setCurrVal] = useState(
//     is(Array, defaultValue) ? defaultValue : []
//   );

//   useEffect(() => {
//     register({ name: fieldProps.name }, refConf);
//     if (defaultValue) {
//       // setValue(fieldProps.name, 'TOWNHOUSE');
//       setValue(fieldProps.name, defaultValue);
//     }
//     return () => {
//       clearError(fieldProps.name);
//       unregister(fieldProps.name);
//     };
//   }, [fieldProps, defaultValue]);

//   if (!fieldProps) return 'This form component needs fieldProps';

//   if (error) return <Error error={error} />;

//   const options = data
//     ? data.__type.enumValues.map((v, i) => ({
//         name: v.name,
//         value: v.name,
//       }))
//     : [];

//   const resolveShowOnParentVals = (config, inner) => {
//     if (inner.parentShowVals.includes(currVal)) {
//       return true;
//     }
//     return false;
//   };

//   const canDisplayInner = (config, inner) => {
//     if (inner.parentShowVals) return resolveShowOnParentVals(config, inner);
//     return true;
//   };

//   const handleOnValueChange = e => {
//     setCurrVal(e.target.value);
//     setValue(fieldProps.name, e.target.value);
//     clearError(fieldProps.name);
//   };

//   return (
//     <>
//       <FormControl
//         variant={fieldProps.variant ? fieldProps.variant : 'outlined'}
//         className={classes.formControl}
//         error={yuckErr}>
//         <InputLabel htmlFor={fieldProps.name}>{fieldProps.label}</InputLabel>

//         <Select
//           defaultValue={defaultValue}
//           onChange={e => handleOnValueChange(e)}
//           label={fieldProps.label}
//           error={fieldError ? true : false}
//           inputProps={{
//             name: fieldProps.name,
//             id: fieldProps.name,
//           }}>
//           {loading && (
//             <MenuItem disabled={true}>
//               <Loader
//                 loading={loading}
//                 text={`loading ${fieldProps.name} options`}
//               />
//             </MenuItem>
//           )}
//           {options &&
//             options.map((d, i) => {
//               return (
//                 <MenuItem key={i} value={d.value}>
//                   {d.value}
//                 </MenuItem>
//               );
//             })}
//         </Select>
//         {fieldError && <FormHelperText error>{fieldError}</FormHelperText>}
//       </FormControl>
//       {inners &&
//         inners.map((inner, idx) => {
//           if (!canDisplayInner(config, inner)) return null;
//           return (
//             <div key={inner.key} style={{ marginTop: '16px' }}>
//               <InputFieldType
//                 {...props}
//                 config={inner}
//                 key={idx}
//                 register={register}
//                 errors={errors}
//                 setValue={setValue}
//                 reset={reset}
//                 defaultValues={defaultValues}
//               />
//             </div>
//           );
//         })}
//     </>
//   );
// }

// SimpleSelect.propTypes = {
//   __type: PropTypes.any,
//   clearError: PropTypes.func.isRequired,
//   config: PropTypes.shape({
//     key: PropTypes.any,
//   }).isRequired,
//   defaultValues: PropTypes.any,
//   errors: PropTypes.any,
//   fieldError: PropTypes.any,
//   getValues: PropTypes.any,
//   handleChange: PropTypes.any,
//   helperText: PropTypes.any,
//   label: PropTypes.any,
//   register: PropTypes.func.isRequired,
//   removeItem: PropTypes.any,
//   reset: PropTypes.any,
//   selectID: PropTypes.any,
//   setValue: PropTypes.func.isRequired,
//   values: PropTypes.any,
// };
