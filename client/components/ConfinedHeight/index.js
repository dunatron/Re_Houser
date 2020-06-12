import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxHeight: props => props.maxHeight,
    overflow: 'auto',
    padding: theme.spacing(1),
  },
}));

const ConfinedHeight = props => {
  const classes = useStyles(props);
  const { children } = props;

  return <div className={classes.root}>{children}</div>;
};

export default ConfinedHeight;
