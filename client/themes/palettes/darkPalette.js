// https://in-your-saas.github.io/material-ui-theme-editor/
//https://react-theming.github.io/create-mui-theme/
import { makefontRgba } from './mainPalette';
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

const fontRgb = `255, 255, 255`;
const theme = {
  palette: {
    nProgress: {
      main: mainSecondaryColor,
    },
    type: 'dark',
    common: { black: 'rgba(59, 40, 40, 1)', white: 'rgba(255, 255, 255, 1)' },
    background: { paper: '#424242', default: '#303030' },
    primary: {
      light: lightPrimaryColor,
      main: mainPrimaryColor,
      dark: darkPrimaryColor,
      contrastText: primaryContrastText,
    },
    secondary: {
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
      primary: makefontRgba(fontRgb, 0.87),
      secondary: makefontRgba(fontRgb, 0.54),
      disabled: makefontRgba(fontRgb, 0.38),
      hint: makefontRgba(fontRgb, 0.38),
    },
  },
  typography: {
    h1: {
      color: makefontRgba(fontRgb, 1),
    },
  },
};
export default theme;
