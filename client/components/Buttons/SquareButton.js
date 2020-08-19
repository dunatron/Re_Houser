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
    borderRadius: 0,
  },
}))(Button);

export default function CustomizedButtons({ btnProps, children, onClick }) {
  return (
    <SquareButton
      variant="contained"
      color="primary"
      onClick={onClick}
      {...btnProps}>
      {children}
    </SquareButton>
  );
}
