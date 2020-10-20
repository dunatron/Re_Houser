import { Box, Typography } from '@material-ui/core';
import HandleInners from './HandleInners';

import useStyles from '../useStyles';

const Li = ({ item }) => {
  const classes = useStyles();
  const {
    type,
    value,
    fieldProps,
    layoutProps,
    inners,
    listStyle,
    listNum,
    title,
  } = item;
  return (
    <Box
      className={classes.li}
      component="li"
      variant="h1"
      // variant={fieldProps.variant}
      {...fieldProps}>
      {listNum && (
        <Typography>
          {listNum}
          {title && (
            <Box component="span" className={classes.li_title}>
              {title}
            </Box>
          )}
        </Typography>
      )}
      {value && <Typography>{value}</Typography>}
      <HandleInners inners={inners} />
    </Box>
  );
};

export default Li;
