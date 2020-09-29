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

// How to actually go about themes
//https://github.com/infonomic/material-ui-theme-switcher/blob/master/src/App.js
// https://egghead.io/lessons/react-create-a-react-hook-to-toggle-between-light-and-dark-mode-inside-of-material-ui-themes
const THEME_PICKER_CONFIG = [
  {
    name: 'Dark Yellow',
    palette: {
      nProgress: {
        main: 'red',
      },
      type: 'dark',
      common: { black: 'rgba(59, 40, 40, 1)', white: 'rgba(255, 255, 255, 1)' },
      background: { paper: '#212121', default: '#212121' },
      primary: yellow,
      secondary: {
        light: '#ff4081',
        main: '#f50057',
        dark: '#c51162',
        contrastText: '#fff',
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
    overrides: {
      MuiAppBar: {
        colorPrimary: { backgroundColor: '#212121', color: '#fff' },
      },
    },
  },
  {
    name: 'Light Theme 1',
    palette: {
      type: 'light',
      common: { black: 'rgba(59, 40, 40, 1)', white: 'rgba(255, 255, 255, 1)' },
      background: { paper: '#fff', default: '#fafafa' },
      primary: {
        light: '#7986cb',
        main: '#3f51b5',
        dark: '#303f9f',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff4081',
        main: '#f50057',
        dark: '#c51162',
        contrastText: '#fff',
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
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.54)',
        disabled: 'rgba(0, 0, 0, 0.38)',
        hint: 'rgba(0, 0, 0, 0.38)',
      },
    },
  },
  {
    name: 'Tanned House',
    palette: {
      type: 'dark',
      common: { black: 'rgba(59, 40, 40, 1)', white: 'rgba(255, 255, 255, 1)' },
      background: { paper: '#8aa0bc', default: '#8aa0bc' },
      primary: {
        light: '#ffffd9',
        main: '#ffe5a7',
        dark: '#cbb377',
        contrastText: '#000000',
      },
      secondary: {
        light: '#8aa0bc',
        main: '#5c728c',
        dark: '#30475f',
        contrastText: '#fff',
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
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.54)',
        disabled: 'rgba(0, 0, 0, 0.38)',
        hint: 'rgba(0, 0, 0, 0.38)',
      },
    },
  },
  {
    name: 'Van le colours',
    palette: {
      type: 'dark',
      common: { black: 'rgba(59, 40, 40, 1)', white: 'rgba(255, 255, 255, 1)' },
      background: { paper: '#8aa0bc', default: '#8aa0bc' },
      primary: {
        light: '#ffffff',
        main: '#cfd8dc',
        dark: '#9ea7aa',
        contrastText: '#000000',
      },
      secondary: {
        light: '#ffffe4',
        main: '#ffe0b2',
        dark: '#30475f',
        contrastText: '#cbae82',
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
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.54)',
        disabled: 'rgba(0, 0, 0, 0.38)',
        hint: 'rgba(0, 0, 0, 0.38)',
      },
    },
  },
  {
    name: 'Classic Tron lite',
    palette: {
      type: 'light',
      common: { black: 'rgba(59, 40, 40, 1)', white: 'rgba(255, 255, 255, 1)' },
      background: { paper: '#fff', default: '#fff' },
      primary: {
        light: '#9162e4',
        main: '#5e35b1',
        dark: '#280680',
        contrastText: '#ffffff',
      },
      secondary: {
        light: '#ff6090',
        main: '#e91e63',
        dark: '#b0003a',
        contrastText: '#000000',
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
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.54)',
        disabled: 'rgba(0, 0, 0, 0.38)',
        hint: 'rgba(0, 0, 0, 0.38)',
      },
    },
  },
  {
    name: 'Classic Tron dark',
    palette: {
      type: 'dark',
      common: { black: 'rgba(59, 40, 40, 1)', white: 'rgba(255, 255, 255, 1)' },
      background: { paper: '#212121', default: '#212121' },
      primary: {
        light: '#9162e4',
        main: '#5e35b1',
        dark: '#280680',
        contrastText: '#ffffff',
      },
      secondary: {
        light: '#ff6090',
        main: '#e91e63',
        dark: '#b0003a',
        contrastText: '#000000',
      },
      // primary: blueGrey,
      // secondary: deepOrange,
      error: {
        light: '#e57373',
        main: '#f44336',
        dark: '#d32f2f',
        contrastText: '#fff',
      },
      //   text: {
      //     primary: 'rgba(0, 0, 0, 0.87)',
      //     secondary: 'rgba(0, 0, 0, 0.54)',
      //     disabled: 'rgba(0, 0, 0, 0.38)',
      //     hint: 'rgba(0, 0, 0, 0.38)',
      //   },
    },
  },
  {
    name: 'Blue-grey 300 & deep orng 300',
    palette: {
      type: 'dark',
      common: { black: 'rgba(59, 40, 40, 1)', white: 'rgba(255, 255, 255, 1)' },
      background: { paper: '#212121', default: '#212121' },
      primary: {
        light: '#e2f1f8',
        main: '#b0bec5',
        dark: '#808e95',
        contrastText: '#000',
      },
      secondary: {
        light: '#ffbb93',
        main: '#ff8a65',
        dark: '#c75b39',
        contrastText: '#000000',
      },
      // primary: blueGrey,
      // secondary: deepOrange,
      error: {
        light: '#e57373',
        main: '#f44336',
        dark: '#d32f2f',
        contrastText: '#fff',
      },
      //   text: {
      //     primary: 'rgba(0, 0, 0, 0.87)',
      //     secondary: 'rgba(0, 0, 0, 0.54)',
      //     disabled: 'rgba(0, 0, 0, 0.38)',
      //     hint: 'rgba(0, 0, 0, 0.38)',
      //   },
    },
  },
  {
    name: 'Gold 1',
    palette: {
      type: 'light',
      primary: {
        light: '#ffd98b',
        main: '#d0a85c',
        dark: '#9c792f',
        contrastText: '#fff',
      },
      secondary: {
        light: '#334b6e',
        main: '#002443',
        dark: '#00001d',
        contrastText: '#fff',
      },
    },
  },
  {
    name: 'Gold 2',
    palette: {
      type: 'light',
      primary: {
        light: '#ffe166',
        main: '#d4af34',
        dark: '#9f8000',
        contrastText: '#fff',
      },
      secondary: {
        light: '#405264',
        main: '#172a3a',
        dark: '#000015',
        contrastText: '#fff',
      },
    },
  },
  {
    name: 'Gold 3',
    palette: {
      type: 'light',
      primary: {
        light: '#ffe166',
        main: '#d4af34',
        dark: '#9f8000',
        contrastText: '#fff',
      },
      secondary: {
        light: '#405264',
        main: '#172a3a',
        dark: '#000015',
        contrastText: '#fff',
      },
    },
  },
  {
    name: 'Gql Pink',
    palette: {
      type: 'light',
      primary: {
        light: '#ff57b1',
        main: '#e00082',
        dark: '#a90056',
        contrastText: '#fff',
      },
      secondary: {
        light: '#405264',
        main: '#172a3a',
        dark: '#000015',
        contrastText: '#fff',
      },
    },
  },
];

export default THEME_PICKER_CONFIG;
