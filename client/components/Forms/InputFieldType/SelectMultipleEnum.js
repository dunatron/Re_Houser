import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Select,
  InputLabel,
  FormHelperText,
  FormControl,
  MenuItem,
  Chip,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { GET_ENUM_QUERY } from '../../../graphql/queries';
import Error from '../../ErrorMessage';
import Loader from '../../Loader';
import FieldError from './FieldError';
import { is } from 'ramda';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    minWidth: 220,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const SelectMultipleEnum = props => {
  const classes = useStyles();
  const {
    __type,
    defaultValues,
    label,
    selectID,
    register,
    config,
    setValue, // is from useForm
    errors,
    helperText,
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
  }, [register]);

  // MD select is not a native input https://github.com/react-hook-form/react-hook-form/issues/497

  if (error) return <Error error={error} />;

  const options = data
    ? data.__type.enumValues.map((v, i) => ({
        name: v.name,
        value: v.name,
      }))
    : [];

  return (
    <FormControl className={classes.root}>
      <InputLabel id={`${selectID}-label`} variant="outlined">
        {label}
      </InputLabel>
      <FieldError errors={errors} name={name} />
      <Select
        name={fieldProps.name}
        labelId={`${selectID}-label`}
        variant="outlined"
        multiple={true} // this needs to be ture but will fail compnet
        id={selectID}
        label={label}
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
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default SelectMultipleEnum;
