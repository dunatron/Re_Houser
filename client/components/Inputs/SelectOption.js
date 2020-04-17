import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const {
    __type,
    isEnum,
    value,
    name,
    options,
    label,
    selectID,
    helperText,
    handleChange,
    defaultValue,
  } = props;
  const classes = useStyles();
  if (isEnum) {
    const { data, error, loading } = useQuery(GET_ENUM_QUERY, {
      variables: {
        name: __type,
      },
    });
    if (loading) return null;
    if (error) return null;

    const mappedItems = data
      ? data.__type.enumValues.map((v, i) => ({
          id: v.name,
          name: v.name,
        }))
      : [];
  }

  const getMappedItems = () => {
    if (!isEnum) return options;
    return [];
    // if (loading) return [];
    // if (error) return [];
  };

  const mappedOptions = getMappedItems();

  return (
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}>
        {mappedOptions.map((d, i) => {
          return (
            <MenuItem key={i} value={d.value}>
              {d.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
