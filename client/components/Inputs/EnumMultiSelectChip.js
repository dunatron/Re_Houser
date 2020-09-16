import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import LabelIcon from '@material-ui/icons/Label';
import { useQuery } from '@apollo/client';
import { GET_ENUM_QUERY } from '@/Gql/queries';

const styles = theme => ({
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
});

const EnumMultiSelectChip = ({
  __type,
  classes,
  values,
  label,
  selectID,
  handleChange,
  removeItem,
}) => {
  const { data, error, loading } = useQuery(GET_ENUM_QUERY, {
    variables: {
      name: __type,
    },
  });
  if (loading) return null;
  if (error) return null;
  const options = data
    ? data.__type.enumValues.map((v, i) => ({
        name: v.name,
        value: v.name,
      }))
    : [];
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor={selectID}>{label}</InputLabel>
      <Select
        multiple={true}
        value={values}
        onChange={e => handleChange(e.target.value)}
        inputProps={{
          name: selectID,
          id: selectID,
        }}
        renderValue={selected => (
          <div className={classes.chips}>
            {selected.map(value => {
              const label = options.find(o => o.value === value);
              return (
                <Chip
                  onDelete={() => removeItem(value)}
                  size="small"
                  icon={<LabelIcon mini />}
                  variant="outlined"
                  color="secondary"
                  label={label.name}
                  className={classes.chip}
                  key={value}
                />
              );
            })}
          </div>
        )}
        input={<Input id="select-multiple-chip" />}>
        {options.map((d, i) => {
          return (
            <MenuItem key={i} value={d.value}>
              {d.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

EnumMultiSelectChip.propTypes = {
  __type: PropTypes.any.isRequired,
  classes: PropTypes.shape({
    chip: PropTypes.any,
    chips: PropTypes.any,
    formControl: PropTypes.any
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.shape({
    name: PropTypes.any
  }).isRequired,
  removeItem: PropTypes.func.isRequired,
  selectID: PropTypes.any.isRequired,
  values: PropTypes.any.isRequired
};

export default withStyles(styles)(EnumMultiSelectChip);
