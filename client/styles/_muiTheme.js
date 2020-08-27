// https://in-your-saas.github.io/material-ui-theme-editor/
//https://react-theming.github.io/create-mui-theme/
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
      light: '#e6339b',
      main: '#e00082',
      dark: '#9c005b',
      // contrastText: 'rgba(255, 255, 255, 0.5)',
      // contrastText: '#232324',
      contrastText: '0c0c0d',
    },
    secondary: deepPurple,
    text: {
      primary: 'rgba(0, 0, 0, 0.77)',
      secondary: 'rgba(0, 0, 0, 0.65)',
      // secondary: 'rgba(255, 255, 255, 0.65)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },
  },
  // palette: {
  //   nProgress: {
  //     main: 'red',
  //   },
  //   type: 'light',
  //   common: { black: 'rgba(59, 40, 40, 1)', white: 'rgba(255, 255, 255, 1)' },
  //   background: { paper: '#fff', default: '#fafafa' },
  //   primary: {
  //     light: '#fff',
  //     main: '#fff',
  //     dark: '#fff',
  //   },
  //   secondary: {
  //     light: '#e6339b',
  //     main: '#e00082',
  //     dark: '#9c005b',
  //   },
  //   text: {
  //     primary: 'rgba(0, 0, 0, 0.77)',
  //     secondary: 'rgba(0, 0, 0, 0.65)',
  //     disabled: 'rgba(0, 0, 0, 0.38)',
  //     hint: 'rgba(0, 0, 0, 0.38)',
  //   },
  // },
  // palette: {
  //   nProgress: {
  //     main: 'red',
  //   },
  //   type: 'light',
  //   common: { black: 'rgba(59, 40, 40, 1)', white: 'rgba(255, 255, 255, 1)' },
  //   background: { paper: '#fff', default: '#fafafa' },
  //   primary: {
  //     light: '#e6339b',
  //     main: '#e00082',
  //     dark: '#9c005b',
  //   },
  //   secondary: deepPurple,
  //   text: {
  //     primary: 'rgba(0, 0, 0, 0.77)',
  //     secondary: 'rgba(0, 0, 0, 0.65)',
  //     disabled: 'rgba(0, 0, 0, 0.38)',
  //     hint: 'rgba(0, 0, 0, 0.38)',
  //   },
  // },
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.54)',
    disabled: 'rgba(0, 0, 0, 0.38)',
    hint: 'rgba(0, 0, 0, 0.38)',
  },
  overrides: {
    MuiTooltipPopper: {
      border: '2px solid red',
    },
    MuiTooltip: {
      tooltip: {
        fontSize: '2em',
        color: 'yellow',
        backgroundColor: 'red',
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
        color: '#e00082',
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
