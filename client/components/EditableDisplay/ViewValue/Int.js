import { Typography, Chip } from '@material-ui/core';
import useViewStyles from './useViewStyles';
import { formatCentsToDollarsVal } from '@/Lib/formatCentsToDollars';
import { is } from 'ramda';

const IntDisplay = ({ item }) => {
  const classes = useViewStyles();
  return <Chip className={classes.chip} size="small" label={item.value} />;
};

export default IntDisplay;
