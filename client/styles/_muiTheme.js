// https://in-your-saas.github.io/material-ui-theme-editor/
//https://react-theming.github.io/create-mui-theme/

// https://material.io/resources/color/#!/?view.left=1&view.right=0&primary.color=D81B60&secondary.color=673AB7&primary.text.color=ffffff&secondary.text.color=ffffff

export const mainPrimaryColor = '#f70080';
export const lightPrimaryColor = '#ff5baf';
export const darkPrimaryColor = '#be0054';
export const primaryContrastText = '#000000';

export const mainSecondaryColor = '#673ab7';
export const lightSecondaryColor = '#9a67ea';
export const darkSecondaryColor = '#320b86';
export const secondaryContrastText = '#ffffff';

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
      main: '#651fff',
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
      primary: 'rgba(0, 0, 0, 0.77)',
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
    },
    MuiTooltipPopper: {
      border: '2px solid red',
    },
    MuiTooltip: {
      tooltip: {
        fontSize: '2em',
        // color: 'yellow',
        // backgroundColor: 'red',
      },
    },
    MuiTooltipTooltip: {},
    tooltip: {
      backgroundColor: 'red',
    },
    MuiButton: {
      root: {
        fontSize: '1rem',
        backgroundColor: '#fff',
      },
      contained: {
        color: mainPrimaryColor,
        backgroundColor: '#fff',
      },
      containedPrimary: {
        color: '#fff',
        // backgroundColor: 'red',
      },
      default: {
        fontSize: '1rem',
        // backgroundColor: 'black',
      },
    },
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
  },
};
export default theme;
