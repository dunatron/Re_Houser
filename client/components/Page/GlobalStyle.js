import { createGlobalStyle } from 'styled-components';

<style type="text/css"></style>;

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
    font-size: ${p => p.theme.typography.fontSize}px;
    line-height: 2;
    font-family: ${p => p.theme.typography.fontFamily};
  }
  a {
    text-decoration: none;
    color: ${p => p.theme.palette.common.black};
  }
  .highlight {
    color: black;
    background-color: ${p => p.theme.palette.nProgress.main};
  }
  button {  font-family: ${p => p.theme.typography.fontFamily}; }
  #nprogress {
    background-color: azure;
    width: 100%;
    position: fixed;
    top: 0;
    .bar {
      height:5px;
      background: ${p => p.theme.palette.nProgress.main};
    }
    .spinner {
      .spinner-icon {
        border-top-color: ${p => p.theme.palette.nProgress.main};
        border-left-color: ${p => p.theme.palette.nProgress.main};
      }
    }
    .peg {
       box-shadow: 0 0 10px ${p =>
         p.theme.palette.nProgress.main}, 0 0 5px ${p =>
  p.theme.palette.nProgress.main};
    }
  }
  .geosuggest__suggests {
    z-index: 1000 !important;
  }

  .Toastify__toast--info {
    background: ${p => p.theme.palette.secondary.main};
    color: ${p => p.theme.palette.secondary.contrastText};
  }
  .Toastify__toast--success {
    background: ${p => p.theme.palette.primary.main};
    color: ${p => p.theme.palette.primary.contrastText};
  }
  .Toastify__toast--warning {
    background: #f1c40f;
  }
  .Toastify__toast--error {
    background: #e74c3c;
  }
  /* Scrollbar style */
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
    /* display: none;  */
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: ${p => p.theme.palette.background.paper};
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${p =>
      p.theme.palette.type === 'dark'
        ? p.theme.palette.secondary.dark
        : p.theme.palette.secondary.main};
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${p =>
      p.theme.palette.type === 'dark'
        ? p.theme.palette.secondary.main
        : p.theme.palette.secondary.dark};
  }

`;

export default GlobalStyle;
