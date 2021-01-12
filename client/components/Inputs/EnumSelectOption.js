import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui//core/styles';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select/Select';
import { useQuery } from '@apollo/client';
import { GET_ENUM_QUERY } from '@/Gql/queries';

const styles = theme => ({
  formControl: {
    minWidth: '220px',
    marginBottom: theme.spacing(2),
  },
});

const EnumSelectOption = props => {
  const {
    __type,
    classes,
    value,
    name,
    label,
    selectID,
    helperText,
    handleChange,
    defaultValue,
  } = props;

  const { data, error, loading } = useQuery(GET_ENUM_QUERY, {
    variables: {
      name: __type,
    },
  });
  if (loading) return null;
  if (error) return null;

  if (!data) return 'No EnumList Returned please contact support';
  if (!data.__type) return 'No EnumList Returned please contact support';

  return (
    <FormControl className={classes.formControl} fullWidth>
      {label && <InputLabel htmlFor={selectID}>{label}</InputLabel>}
      <Select
        defaultValue={defaultValue ? defaultValue : ''}
        displayEmpty
        name={name}
        className={classes.selectEmpty}
        onChange={e => handleChange(e.target.value)}>
        {data &&
          data.__type.enumValues.map((v, i) => {
            return (
              <MenuItem key={i} value={v.name}>
                {v.name}
              </MenuItem>
            );
          })}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

EnumSelectOption.propTypes = {
  __type: PropTypes.any,
  classes: PropTypes.shape({
    formControl: PropTypes.any,
    selectEmpty: PropTypes.any,
  }).isRequired,
  defaultValue: PropTypes.any,
  handleChange: PropTypes.func.isRequired,
  helperText: PropTypes.any,
  label: PropTypes.any,
  name: PropTypes.any,
  selectID: PropTypes.any,
  value: PropTypes.any,
};

export default withStyles(styles)(EnumSelectOption);
