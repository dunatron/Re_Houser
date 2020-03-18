import React from 'react';
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';

const SquareButton = withStyles(theme => ({
  root: {
    // color: theme.palette.getContrastText(purple[500]),
    // backgroundColor: purple[500],
    // '&:hover': {
    //   backgroundColor: purple[700],
    // },
    borderRadius: 0,
  },
}))(Button);

export default function CustomizedButtons({ btnProps, children }) {
  return (
    <SquareButton variant="contained" color="primary" {...btnProps}>
      {children}
    </SquareButton>
  );
}
