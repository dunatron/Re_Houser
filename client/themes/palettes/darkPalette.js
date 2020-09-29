// https://in-your-saas.github.io/material-ui-theme-editor/
//https://react-theming.github.io/create-mui-theme/
import { yellow } from '@material-ui/core/colors';
const theme = {
  palette: {
    nProgress: {
      main: 'red',
    },
    type: 'dark',
    common: { black: 'rgba(59, 40, 40, 1)', white: 'rgba(255, 255, 255, 1)' },
    background: { paper: '#212121', default: '#212121' },
    primary: yellow,
    // secondary: {
    //   light: '#ff4081',
    //   main: '#f50057',
    //   dark: '#c51162',
    //   contrastText: '#fff',
    // },
    secondary: {
      light: '#8561c5',
      main: '#673ab7',
      dark: '#482880',
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
};
export default theme;
