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

const mainPalette = {
  palette: {
    nProgress: {
      main: mainPrimaryColor,
    },
    common: {
      black: '#000',
      white: '#fff',
    },
    type: 'light',
    background: { paper: '#fff', default: '#fff' },
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
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },
  },
};
export default mainPalette;
