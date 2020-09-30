import { createGlobalStyle } from 'styled-components';

// const GlobalStyle = createGlobalStyle`
//   html {
//     box-sizing: border-box;
//     font-size: 14px;
//     scroll-behavior: smooth;
//   }
//   *, *:before, *:after {
//     box-sizing: inherit;
//   }
//   fieldset{
//     padding: 0;
//     margin-inline-start: unset;
//     margin-inline-end: unset;
//     padding-block-start: unset;
//     padding-inline-start: unset;
//     padding-inline-end: unset;
//     padding-block-end: unset;
//     min-inline-size: unset;
//     border: 0;
//   }
//   body {
//     padding: 0;
//     margin: 0;
//     font-size: ${p => p.theme.typography.fontSize}px;
//     line-height: 2;
//     font-family: ${p => p.theme.typography.fontFamily};
//   }
//   a {
//     text-decoration: none;
//     color: ${p => p.theme.palette.common.black};
//   }
//   .highlight {
//     color: black;
//     background-color: ${p => p.theme.palette.nProgress.main};
//   }
//   button {  font-family: ${p => p.theme.typography.fontFamily}; }
//   #nprogress {
//     background-color: azure;
//     width: 100%;
//     position: fixed;
//     top: 0;
//     .bar {
//       height:5px;
//       background: ${p => p.theme.palette.nProgress.main};
//     }
//     .spinner {
//       .spinner-icon {
//         border-top-color: ${p => p.theme.palette.nProgress.main};
//         border-left-color: ${p => p.theme.palette.nProgress.main};
//       }
//     }
//     .peg {
//        box-shadow: 0 0 10px ${p =>
//          p.theme.palette.nProgress.main}, 0 0 5px ${p =>
//   p.theme.palette.nProgress.main};
//     }
//   }
//   .geosuggest__suggests {
//     z-index: 1000 !important;
//   }

//   // Toast Stuff
//   .Toastify__toast--info {
//     background: ${p => p.theme.palette.secondary.main};
//     color: ${p => p.theme.palette.secondary.contrastText};
//   }
//   .Toastify__toast--success {
//     background: ${p => p.theme.palette.primary.main};
//     color: ${p => p.theme.palette.primary.contrastText};
//   }
//   .Toastify__toast--warning {
//     background: #f1c40f;
//   }
//   .Toastify__toast--error {
//     background: #e74c3c;
//   }
// `;

// export default GlobalStyle;
const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 14px;
    scroll-behavior: smooth;
  }
`;

export default GlobalStyle;

// import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

// const GlobalStyle = ({ theme }) => createGlobalStyle`
//   html {
//     box-sizing: border-box;
//     font-size: 14px;
//     scroll-behavior: smooth;
//   }
//   *, *:before, *:aftyarn run dever {
//     box-sizing: inherit;
//   }
//   fieldset{
//     padding: 0;
//     margin-inline-start: unset;
//     margin-inline-end: unset;
//     padding-block-start: unset;
//     padding-inline-start: unset;
//     padding-inline-end: unset;
//     padding-block-end: unset;
//     min-inline-size: unset;
//     border: 0;
//   }
//   body {
//     padding: 0;
//     margin: 0;
//     font-size: ${theme.typography.fontSize}px;
//     line-height: 2;
//     font-family: ${theme.typography.fontFamily};
//   }
//   a {
//     text-decoration: none;
//     color: ${theme.palette.common.black};
//   }
//   .highlight {
//     color: black;
//     background-color: ${theme.palette.nProgress.main};
//   }
//   button {  font-family: ${theme.typography.fontFamily}; }
//   #nprogress {
//     background-color: azure;
//     width: 100%;
//     position: fixed;
//     top: 0;
//     .bar {
//       height:5px;
//       background: ${theme.palette.nProgress.main};
//     }
//     .spinner {
//       .spinner-icon {
//         border-top-color: ${theme.palette.nProgress.main};
//         border-left-color: ${theme.palette.nProgress.main};
//       }
//     }
//     .peg {
//        box-shadow: 0 0 10px ${theme.palette.nProgress.main}, 0 0 5px ${theme.palette.nProgress.main};
//     }
//   }
//   .geosuggest__suggests {
//     z-index: 1000 !important;
//   }

//   .Toastify__toast--default {
//     background: #fff;
//     color: #aaa;
//   }
//   .Toastify__toast--info {
//     /* background: #3498db; */
//     background: #07bc0c;
//   }
//   .Toastify__toast--success {
//     background: #07bc0c;
//   }
//   .Toastify__toast--warning {
//     background: #f1c40f;
//   }
//   .Toastify__toast--error {
//     background: #e74c3c;
//   }
//   .Toastify__toast-body {
//     margin: auto 0;
//     -ms-flex: 1;
//     flex: 1;
//   }

//   .Toastify__toast--info {
//     background: ${theme.palette.secondary.main};
//     color: ${theme.palette.secondary.contrastText};
//   }
//   .Toastify__toast--success {
//     background: ${theme.palette.primary.main};
//     color: ${theme.palette.primary.contrastText};
//   }
//   .Toastify__toast--warning {
//     background: #f1c40f;
//   }
//   .Toastify__toast--error {
//     background: #e74c3c;
//   }
// `;

// export default GlobalStyle;
