import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const RToolTip = withStyles(theme => ({
  tooltip: {
    // backgroundColor: theme.palette.common.white,
    // color: 'rgba(0, 0, 0, 0.87)',
    // boxShadow: theme.shadows[1],
    // fontSize: 11,
    fontSize: '1.2em',
  },
}))(Tooltip);

export default RToolTip;
