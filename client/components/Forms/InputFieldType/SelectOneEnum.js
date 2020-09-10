import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Select,
  InputLabel,
  FormHelperText,
  FormControl,
  MenuItem,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { GET_ENUM_QUERY } from '../../../graphql/queries';
import Error from '../../ErrorMessage';
import Loader from '../../Loader';
import FieldError from './FieldError';
import { is } from 'ramda';
import InputFieldType from './index';

const useStyles = makeStyles(theme => ({
  formControl: {
    marginBottom: theme.spacing(1),
    minWidth: 160,
    // width: '100%',
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

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
    config,
    setValue, // is from useForm
    reset,
    errors,
    defaultValues,
    helperText,
    fieldError,
  } = props;

  const yuckErr = errors[name]; //thats why I labelled it yuck, shold work with architecture right.. .SO check this out wehen you have time

  const { type, inners, fieldProps, refConf } = config;
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
      setValue(fieldProps.name, 'TOWNHOUSE');
    }
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

  const handleOnValueChange = e => {
    setCurrVal(e.target.value);
    setValue(fieldProps.name, e.target.value);
  };

  return (
    <>
      <FormControl
        variant="outlined"
        className={classes.formControl}
        error={yuckErr}>
        <InputLabel htmlFor={fieldProps.name}>{label}</InputLabel>

        <Select
          defaultValue={defaultValue}
          onChange={e => handleOnValueChange(e)}
          label={label}
          error={yuckErr}
          helperText={fieldError}
          inputProps={{
            name: fieldProps.name,
            id: fieldProps.name,
          }}>
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
        <FieldError errors={errors} name={config.key} />
      </FormControl>
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
