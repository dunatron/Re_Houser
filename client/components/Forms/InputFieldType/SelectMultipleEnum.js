import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Select,
  InputLabel,
  FormHelperText,
  FormControl,
  MenuItem,
  Chip,
  TextField,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { GET_ENUM_QUERY } from '../../../graphql/queries';
import Error from '../../ErrorMessage';
import Loader from '../../Loader';
import FieldError from './FieldError';
import { is } from 'ramda';
import useStyles from '@/Components/Forms/useStyles';

// experimental
import Autocomplete from '@material-ui/lab/Autocomplete';

const SelectMultipleEnum = props => {
  const classes = useStyles();
  const {
    __type,
    defaultValues,
    label,
    selectID,
    register,
    unregister,
    config,
    setValue, // is from useForm
    errors,
    helperText,
    fieldError,
  } = props;

  const { fieldProps, refConf } = config;
  const defaultValue = defaultValues[fieldProps.name];
  const { data, error, loading } = useQuery(GET_ENUM_QUERY, {
    variables: {
      name: __type,
    },
  });

  useEffect(() => {
    register({ name: fieldProps.name }, refConf);
    if (defaultValue) {
      setValue(fieldProps.name, defaultValue);
    } else {
      setValue(fieldProps.name, []);
    }
    return () => {
      unregister(fieldProps.name);
    };
  }, [register]);

  const handleOnValueChange = (event, valueArr, reason) => {
    if (valueArr.length > 0) {
      setValue(
        fieldProps.name,
        valueArr.map(val => val.value)
      );
    } else {
      setValue(fieldProps.name, valueArr);
    }
  };

  // MD select is not a native input https://github.com/react-hook-form/react-hook-form/issues/497

  if (error) return <Error error={error} />;

  const options = data
    ? data.__type.enumValues.map((v, i) => ({
        name: v.name,
        value: v.name,
      }))
    : [];

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect={true}
      variant={fieldProps.variant ? fieldProps.variant : 'outlined'}
      style={{ marginBottom: '16px' }}
      id={`${selectID}-multiselect`}
      options={options}
      defaultValue={is(Array, defaultValue) ? defaultValue : []} // probably wont work
      getOptionLabel={option => option.name}
      onChange={handleOnValueChange}
      getOptionSelected={(option, value) => option.value === value.value}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            key={option.name}
            label={option.name}
            className={classes.chip}
            color="secondary"
            label={option.name}
            {...getTagProps({ index })}
          />
        ))
      }
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
  );

  return (
    <FormControl
      className={classes.formControl}
      variant={fieldProps.variant ? fieldProps.variant : 'outlined'}>
      <InputLabel
        id={`${selectID}-label`}
        variant={fieldProps.variant ? fieldProps.variant : 'outlined'}>
        {label}
      </InputLabel>
      <FieldError errors={errors} name={fieldProps.name} />
      <Select
        name={fieldProps.name}
        labelId={`${selectID}-label`}
        multiple={true} // this needs to be ture but will fail compnet
        id={selectID}
        label={label}
        error={fieldError ? true : false}
        onChange={e => setValue(fieldProps.name, e.target.value)}
        defaultValue={is(Array, defaultValue) ? defaultValue : []} // use ramda and mke sre isArr(defualtValue). cmp expcts it 2 b so rtn[] if not
        renderValue={selected => (
          <div className={classes.chips}>
            {selected.map(value => (
              <Chip
                key={value}
                label={value}
                className={classes.chip}
                color="secondary"
              />
            ))}
          </div>
        )}>
        {loading && (
          <MenuItem disabled={true}>
            <Loader
              loading={loading}
              text={`loading ${fieldProps.name} options`}
            />
          </MenuItem>
        )}
        {options &&
          options.map((d, i) => {
            return (
              <MenuItem key={i} value={d.value}>
                {d.value}
              </MenuItem>
            );
          })}
      </Select>
      {fieldError && <FormHelperText error>{fieldError}</FormHelperText>}
    </FormControl>
  );
};

SelectMultipleEnum.propTypes = {
  __type: PropTypes.any,
  config: PropTypes.any,
  defaultValues: PropTypes.any,
  errors: PropTypes.any,
  helperText: PropTypes.any,
  label: PropTypes.any,
  register: PropTypes.func.isRequired,
  selectID: PropTypes.any,
  setValue: PropTypes.func.isRequired,
};

export default SelectMultipleEnum;
