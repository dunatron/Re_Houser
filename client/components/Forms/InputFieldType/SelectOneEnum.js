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
    defaultValue,
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
    helperText,
  } = props;

  const { type, inners, fieldProps, refConf } = config;
  const { data, error, loading } = useQuery(GET_ENUM_QUERY, {
    variables: {
      name: __type,
    },
  });

  // const currValues = getValues();
  // const currVal = currValues[fieldProps.name];

  const [currVal, setCurrVal] = useState(
    is(Array, defaultValue) ? defaultValue : []
  );

  // const currVal = fieldProps.name

  if (!fieldProps) return 'This form component needs fieldProps';

  // MD select is not a native input https://github.com/react-hook-form/react-hook-form/issues/497
  useEffect(() => {
    register({ name: fieldProps.name }, refConf);
    if (!defaultValue) setValue(fieldProps.name, []);
  }, [register]);

  if (loading) return <Loader loading={loading} />;
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
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor={fieldProps.name}>{label}</InputLabel>
        <Select
          defaultValue={is(Array, defaultValue) ? defaultValue : []}
          onChange={e => handleOnValueChange(e)}
          label={label}
          inputProps={{
            name: fieldProps.name,
            id: fieldProps.name,
          }}>
          {options &&
            options.map((d, i) => {
              return (
                <MenuItem key={i} value={d.value}>
                  {d.value}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      {inners &&
        inners.map((inner, idx) => {
          if (!canDisplayInner(config, inner)) return null;
          return (
            <div style={{ marginTop: '16px' }}>
              <InputFieldType
                config={inner}
                key={idx}
                register={register}
                errors={errors}
                setValue={setValue}
                reset={reset}
              />
            </div>
          );
        })}
    </>
  );
}
