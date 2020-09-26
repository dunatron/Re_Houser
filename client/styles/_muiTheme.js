// https://in-your-saas.github.io/material-ui-theme-editor/
//https://react-theming.github.io/create-mui-theme/

// https://material.io/resources/color/#!/?view.left=1&view.right=0&primary.color=D81B60&secondary.color=673AB7&primary.text.color=ffffff&secondary.text.color=ffffff

// Hottest pink
// export const mainPrimaryColor = '#f70080';
// export const lightPrimaryColor = '#ff5baf';
// export const darkPrimaryColor = '#be0054';
// export const primaryContrastText = '#000000';

// Darkish Pink almost maroony and Dark Blue
//material.io/resources/color/#!/?view.left=0&view.right=1&primary.color=d81b60&secondary.color=172A3A&primary.text.color=ffffff
// export const mainPrimaryColor = '#d81b60';
// export const lightPrimaryColor = '#ff5c8d';
// export const darkPrimaryColor = '#a00037';
// export const primaryContrastText = '#000000';

// // secondary color pink
// export const mainSecondaryColor = '#172a3a';
// export const lightSecondaryColor = '#405264';
// export const darkSecondaryColor = '#000015';
// export const secondaryContrastText = '#000000';

// howtogql pink and Dark Blue
//https://material.io/resources/color/#!/?view.left=1&view.right=1&primary.color=e00082&secondary.color=172A3A
// export const mainPrimaryColor = '#e00082';
// export const lightPrimaryColor = '#ff5c8d';
// export const darkPrimaryColor = '#a00037';
// // export const primaryContrastText = '#000';
// export const primaryContrastText = '#fff';

// // secondary color dark blue
// export const mainSecondaryColor = '#172a3a';
// export const lightSecondaryColor = '#405264';
// export const darkSecondaryColor = '#000015';
// export const secondaryContrastText = '#fff';

// https://material.io/resources/color/#!/?view.left=0&view.right=1&primary.color=e00082&secondary.color=000444
// export const mainPrimaryColor = '#e60085';
// export const lightPrimaryColor = '#ff58b5';
// export const darkPrimaryColor = '#ae0058';
// // export const primaryContrastText = '#000';
// export const primaryContrastText = '#fff';

// // secondary color dark blue
// export const mainSecondaryColor = '#000444';
// export const lightSecondaryColor = '#342c70';
// export const darkSecondaryColor = '#00001f';
// export const secondaryContrastText = '#fff';

// https://material.io/resources/color/#!/?view.left=0&view.right=1&primary.color=e00082&secondary.color=000444

// export const mainPrimaryColor = '#e60085';
// export const lightPrimaryColor = '#ff58b5';
// export const darkPrimaryColor = '#ae0058';
// // export const primaryContrastText = '#000';
// export const primaryContrastText = '#fff';

// // secondary color dark blue
// export const mainSecondaryColor = '#002443';
// export const lightSecondaryColor = '#ffd98b';
// export const darkSecondaryColor = '#00001d';
// export const secondaryContrastText = '#fff';

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

import {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
  brown,
  grey,
  blueGrey,
  common,
} from '@material-ui/core/colors';
const theme = {
  maxWidth: 1200,
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
  sideBarWidth: 240,
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    values: { xs: 0, lg: 1280, sm: 600, xl: 1920, md: 960 },
  },
  // https://material.io/resources/color/#!/?view.left=0&view.right=1&primary.color=ffffff&secondary.color=e00082
  // https://material.io/resources/color/#!/?view.left=0&view.right=1&primary.color=e00082&secondary.color=ffffff
  palette: {
    nProgress: {
      // main: mainPrimaryColor,
      main: mainSecondaryColor,
    },
    type: 'light',
    // common: { black: 'rgba(59, 40, 40, 1)', white: 'rgba(255, 255, 255, 1)' },
    common: { black: 'rgba(12, 12, 13, 1)', white: 'rgba(255, 255, 255, 1)' },
    // background: { paper: '#fff', default: '#fafafa' },
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
      primary: 'rgba(23, 42, 58, .5)',
      // primary: 'rgba(255, 180, 0, 0.77)',
      secondary: 'rgba(0, 0, 0, 0.65)',
      // secondary: 'rgba(255, 255, 255, 0.65)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },
  },
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.54)',
    disabled: 'rgba(0, 0, 0, 0.38)',
    hint: 'rgba(0, 0, 0, 0.38)',
  },
  overrides: {
    // .MuiAppBar-colorPrimary
    MuiAppBar: {
      colorPrimary: {
        // color: mainPrimaryColor,
        // backgroundColor: '#ffffff',
      },
      colorSecondary: {
        // backgroundColor: '#ffffff',
        // color: mainPrimaryColor,
      },
    },
    MuiTooltipPopper: {
      border: '2px solid red',
    },
    MuiTooltip: {
      tooltip: {
        fontSize: '1.0em',
      },
    },
    MuiTooltipTooltip: {},
    MuiButton: {
      root: {
        fontSize: '1rem',
        backgroundColor: 'inherit',
      },
      contained: {
        color: mainPrimaryColor,
        backgroundColor: '#fff',
      },
      containedPrimary: {
        color: '#fff',
      },
      containedSecondary: {
        color: '#fff',
      },
    },
    MuiButtonBase: {
      root: {
        color: 'inherit',
      },
    },
    MuiIconButton: {
      root: { color: 'inherit' },
      label: { color: 'inherit' },
    },
    MuiInputBase: {
      root: {
        color: 'inherit',
      },
    },
    MuiListItem: {},
    MuiListItemIcon: {
      root: {
        minWidth: '56px', // originally 56px // and so it should be, u used wrong component
      },
      alignItemsFlexStart: {},
    },
    MuiDrawer: {
      // root: {
      //   width: '120px',
      // },
      // paper: {
      //   width: '120px',
      // },
    },
    // PICKERS override
    MuiPickersToolbar: {
      toolbar: {
        // backgroundColor: lightBlue.A200,
        // backgroundColor: lightBlue.A200,
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        // backgroundColor: lightBlue.A200,
        // color: "white",
      },
    },
    MuiPickersDay: {
      day: {
        // color: lightBlue.A700,
        // color: lightBlue.A700,
      },
      daySelected: {
        // backgroundColor: lightBlue['400'],
        // backgroundColor: lightBlue['400'],
      },
      dayDisabled: {
        // color: lightBlue['100'],
        // color: lightBlue['100'],
      },
      current: {
        // color: lightBlue['900'],
        // color: lightBlue['900'],
      },
    },
    MuiPickersModal: {
      dialogAction: {
        // color: lightBlue['400'],
        // color: lightBlue['400'],
      },
    },
  },
};
export default theme;
