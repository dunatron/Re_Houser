import { Typography, Chip } from '@material-ui/core';
import useViewStyles from './useViewStyles';
import { formatCentsToDollarsVal } from '@/Lib/formatCentsToDollars';
import { is } from 'ramda';

const SelectMultipleEnumDisplay = ({ item }) => {
  const classes = useViewStyles();
  return (
    <Typography variant="body1">
      {is(Array, item.value) ? (
        item.value.map((val, idx) => (
          <Chip className={classes.chip} size="small" label={val} />
        ))
      ) : (
        <Chip size="small" className={classes.chip} label={item.value} />
      )}
    </Typography>
  );
};

export default SelectMultipleEnumDisplay;
