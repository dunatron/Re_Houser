// https://in-your-saas.github.io/material-ui-theme-editor/
//https://react-theming.github.io/create-mui-theme/

// secondary color dark blue
export const mainPrimaryColor = '#fff59d';
export const lightPrimaryColor = '#fff7b0';
export const darkPrimaryColor = '#b2ab6d';
// export const primaryContrastText = '#000';
export const primaryContrastText = '#000';

// secondary color dark blue
export const mainSecondaryColor = '#90caf9';
export const lightSecondaryColor = '#a6d4fa';
export const darkSecondaryColor = '#648dae';
export const secondaryContrastText = '#000';

import { yellow, purple, teal, blue } from '@material-ui/core/colors';
const theme = {
  palette: {
    nProgress: {
      main: mainSecondaryColor,
    },
    type: 'dark',
    common: { black: 'rgba(59, 40, 40, 1)', white: 'rgba(255, 255, 255, 1)' },
    background: { paper: '#424242', default: '#303030' },
    primary: {
      // main: yellow[200], // #fff59d
      light: lightPrimaryColor,
      main: mainPrimaryColor,
      dark: darkPrimaryColor,
      contrastText: primaryContrastText,
    },
    secondary: {
      // main: blue[200],
      light: lightSecondaryColor,
      main: mainSecondaryColor,
      dark: darkSecondaryColor,
      contrastText: secondaryContrastText,
    },
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
