// https://in-your-saas.github.io/material-ui-theme-editor/
//https://react-theming.github.io/create-mui-theme/

// secondary color dark blue
export const mainSecondaryColor = '#673ab7';
export const lightSecondaryColor = '#8561c5';
export const darkSecondaryColor = '#482880';
export const secondaryContrastText = '#fff';

import { yellow } from '@material-ui/core/colors';
const theme = {
  palette: {
    nProgress: {
      main: mainSecondaryColor,
    },
    type: 'dark',
    common: { black: 'rgba(59, 40, 40, 1)', white: 'rgba(255, 255, 255, 1)' },
    background: { paper: '#424242', default: '#303030' },
    primary: yellow,
    secondary: {
      light: lightSecondaryColor,
      main: mainSecondaryColor,
      dark: darkSecondaryColor,
      contrastText: secondaryContrastText,
    },
    // primary: blueGrey,
    // secondary: deepOrange,
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.87)',
      secondary: 'rgba(255, 255, 255, 0.54)',
      disabled: 'rgba(255, 255, 255, 0.38)',
      hint: 'rgba(255, 255, 255, 0.38)',
    },
  },
};
export default theme;
