import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { useQuery } from '@apollo/client';
import { GET_ENUM_QUERY } from '../../../graphql/queries';
import Error from '../../ErrorMessage';
import Loader from '../../Loader';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
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
    values,
    defaultValue,
    label,
    selectID,
    handleChange,
    removeItem,
  } = props;
  console.log('His props ', props);
  const { data, error, loading } = useQuery(GET_ENUM_QUERY, {
    variables: {
      name: __type,
    },
  });
  if (loading) return <Loader loading={loading} />;
  if (error) return <Error error={error} />;

  const options = data
    ? data.__type.enumValues.map((v, i) => ({
        name: v.name,
        value: v.name,
      }))
    : [];

  return (
    <FormControl>
      <InputLabel id="bring-the-crowd-they-cant-here-me" variant="outlined">
        {label}
      </InputLabel>
      <Select
        labelId="bring-the-crowd-they-cant-here-me"
        variant="outlined"
        multiple={true} // this needs to be ture but will fail compnet
        id="bring-the-crowd"
        // I come back like 32
        defaultValue={defaultValue ? defaultValue : []} // use ramda and mke sre isArr(defualtValue). cmp expcts it 2 b so rtn[] if not
      >
        {options &&
          options.map((d, i) => {
            return <MenuItem value={d.value}>{d.value}</MenuItem>;
          })}
      </Select>
    </FormControl>
  );

  return (
    <Select
      labelId="bring-the-crowd"
      multiple={true} // this needs to be ture but will fail compnet
      id="bring-the-crowd"
      // I come back like 32
      // label={label}
      label="test"
      defaultValue={defaultValue ? defaultValue : []} // use ramda and mke sre isArr(defualtValue). cmp expcts it 2 b so rtn[] if not
      // i jump back like 33
      //   onChange={onChange}
      // hit me
      // and i never 0
      // and i never return 0 // rm
    >
      {options &&
        options.map((d, i) => {
          return <MenuItem value={d.value}>{d.value}</MenuItem>;
        })}
    </Select>
  );
};

export default SelectMultipleEnum;

// export default withStyles(styles)(EnumMultiSelectChip);
