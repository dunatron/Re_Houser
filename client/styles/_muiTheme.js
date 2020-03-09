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
  palette: {
    nProgress: {
      main: 'red',
    },
    common: { black: 'rgba(59, 40, 40, 1)', white: 'rgba(255, 255, 255, 1)' },
    background: { paper: '#fff', default: '#fafafa' },
    // primary: {
    //   light: '#7986cb',
    //   main: '#3f51b5',
    //   dark: '#303f9f',
    //   contrastText: '#fff',
    // },
    // secondary: {
    //   light: '#ff4081',
    //   main: '#f50057',
    //   dark: '#c51162',
    //   contrastText: '#fff',
    // },
    primary: blueGrey,
    secondary: deepOrange,
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },
  },
  // palette: {
  //   type: 'light',

  //   primary: {
  //     // light: will be calculated from palette.primary.main,
  //     main: '#673ab7',
  //     // dark: will be calculated from palette.primary.main,
  //     // contrastText: will be calculated to contrast with palette.primary.main
  //   },
  //   secondary: {
  //     // light: will be calculated from palette.primary.main,

  //     main: '#455A64',
  //     // dark: will be calculated from palette.primary.main,
  //     // contrastText: will be calculated to contrast with palette.primary.main
  //   },
  //   error: { light: '#e57373', main: '#f44336', dark: '#d32f2f' },

  //   // custom prop so only defined props available
  //   nProgress: {
  //     main: 'red',
  //   },
  //   // error: will use the default color
  // },
};
export default theme;
