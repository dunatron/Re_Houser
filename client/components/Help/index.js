import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, Tooltip } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Help = ({ toolTip }) => {
  const classes = useStyles();
  return (
    <Tooltip title={toolTip ? toolTip : 'Help'}>
      <IconButton aria-label="delete" className={classes.margin} size="small">
        <InfoOutlinedIcon fontSize="inherit" />
      </IconButton>
    </Tooltip>
  );
};

export default Help;
