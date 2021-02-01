import { overrides } from '../overrides';
export const mainPrimaryColor = '#d0a85c';
export const lightPrimaryColor = '#ff58b5';
export const darkPrimaryColor = '#9c792f';
// export const primaryContrastText = '#000';
export const primaryContrastText = '#fff';

// secondary color dark blue
export const mainSecondaryColor = '#002443';
export const lightSecondaryColor = '#334b6e';
export const darkSecondaryColor = '#00001d';
export const secondaryContrastText = '#fff';

export const makefontRgba = (value, hue) => `rgba(${value}, ${hue})`;
const fontRgb = `62, 62, 62`;
const mainPalette = {
  palette: {
    nProgress: {
      main: mainSecondaryColor,
    },
    common: {
      black: '#000',
      white: '#fff',
    },
    type: 'light',
    background: { paper: '#fff', default: '#fafafa' },
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
    text: {
      primary: makefontRgba(fontRgb, 0.87),
      secondary: makefontRgba(fontRgb, 0.54),
      disabled: makefontRgba(fontRgb, 0.38),
      hint: makefontRgba(fontRgb, 0.38),
    },
  },
  // Make sure any changes you add here such as color you add in for other themes i.e darkPallete
  typography: {
    h1: {
      color: makefontRgba(fontRgb, 0.85),
    },
  },
  overrides: {
    // Style sheet name ⚛️
    ...overrides,
    MuiAlert: {
      ...overrides.MuiAlert,
      root: {
        marginBottom: '16px',
      },
      message: {
        padding: '13px 0',
      },
      icon: {
        fontSize: '32px',
        // color: `${mainPrimaryColor} !important`,
      },
      // standardInfo: {
      //   // backgroundColor: lightSecondaryColor,
      //   backgroundColor: '#002443',
      //   color: '#fff',
      // },
    },
  },
};
export default mainPalette;
