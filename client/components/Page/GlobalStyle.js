import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';

import muiTheme from '../../styles/_muiTheme';
// theme typography
import themeTypography from '../../styles/_themeTypography';

const theme = createMuiTheme({
  ...muiTheme,
  palette: {
    ...muiTheme.palette,
  },
  ...themeTypography,
});

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 14px;
    scroll-behavior: smooth;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  fieldset{ 
    padding: 0;
    margin-inline-start: unset;
    margin-inline-end: unset;
    padding-block-start: unset;
    padding-inline-start: unset;
    padding-inline-end: unset;
    padding-block-end: unset;
    min-inline-size: unset;
    border: 0;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: ${theme.typography.fontSize}px;
    line-height: 2;
    font-family: ${theme.typography.fontFamily};
  }
  a {
    text-decoration: none;
    color: ${theme.palette.common.black};
  }
  .highlight {
    color: black;
    background-color: ${theme.palette.nProgress.main};
  }
  button {  font-family: ${theme.typography.fontFamily}; }
  #nprogress {
    background-color: azure;
    width: 100%;
    position: fixed;
    top: 0;
    .bar {
      height:5px;
      background: ${theme.palette.nProgress.main};
    }
    .spinner {
      .spinner-icon {
        border-top-color:${theme.palette.nProgress.main};
        border-left-color: ${theme.palette.nProgress.main};
      }
    }
    .peg {
       box-shadow: 0 0 10px ${theme.palette.nProgress.main}, 0 0 5px ${theme.palette.nProgress.main};
    }
  }
  .geosuggest__suggests {
    z-index: 1000 !important
  }

  // Toast Stuff
  .Toastify__toast--info {
    background: ${theme.palette.secondary.main}
    color:  ${theme.palette.secondary.contrastText}
  }
  .Toastify__toast--success {
    background: ${theme.palette.primary.main}
    color:  ${theme.palette.primary.contrastText}
  }
  .Toastify__toast--warning {
    background: #f1c40f;
  }
  .Toastify__toast--error {
    background: #e74c3c;
  }
`;

export default GlobalStyle;
