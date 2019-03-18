import React, { Component } from "react"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"

import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles"
import Header from "../Header/index"
import Meta from "../Meta/index"
// Material UI
import NoSsr from "@material-ui/core/NoSsr"
import muiTheme from "../../styles/_muiTheme"
import Notifier, { openSnackbar } from "../Notifier/index"

// Google
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react"

const theme = createMuiTheme(muiTheme)

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 1rem;
  @media (max-width: ${props => props.theme.breakpoints.values.md}px) {
    padding: 0;
  }
`

const GlobalStyle = createGlobalStyle`
 @font-face {
    font-family: "GustanLight";
    src: url('/static/fonts/Gustan-Light.woff') format('woff'); /* IE9 Compat Modes */
    font-style:   normal;
    font-weight:  200;
  }
  @font-face {
    font-family: "GustanMedium";
    src: url('/static/fonts/Gustan-Medium.woff') format('woff'); /* IE9 Compat Modes */
    font-style:   normal;
    font-weight:  200;
  }
  @font-face {
    font-family: "GustanBold";
    src: url('/static/fonts/Gustan-Bold.woff') format('woff'); /* IE9 Compat Modes */
    font-style:   normal;
    font-weight:  200;
  }
  @font-face {
    font-family: "GustanExtraBlack";
    src: url('/static/fonts/Gustan-Extrablack.woff') format('woff'); /* IE9 Compat Modes */
    font-style:   normal;
    font-weight:  200;
  }
  html {
    box-sizing: border-box;
    /* font-size: 10px; */
    font-size: 16px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
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
    /* background-color: yellow; */
    background-color: ${theme.palette.secondary.main};
  }
  button {  font-family: ${theme.typography.fontFamily}; }
  #nprogress {
    background-color: azure;
    width: 100%;
    position: fixed;
    top: 0;
    .bar {
      height:5px;
      background: ${theme.palette.secondary.main};
      /* background: #3f51b5; */
    }
    .spinner {
      .spinner-icon {
        border-top-color:${theme.palette.secondary.main};
        border-left-color: ${theme.palette.secondary.main};
      }
    }
    .peg {
       box-shadow: 0 0 10px ${theme.palette.secondary.main}, 0 0 5px ${
  theme.palette.secondary.main
};
    }
  }
  
`

class Page extends Component {
  render() {
    const { google } = this.props
    return (
      <NoSsr>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <StyledPage>
              <Meta />
              <Header />
              <Notifier />
              <Inner>{this.props.children}</Inner>
            </StyledPage>
          </ThemeProvider>
        </MuiThemeProvider>
        <GlobalStyle />
        <div id="modal-root" />
      </NoSsr>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDe_TIz2AQ9mKfYpsb6U3RG7fjnM8eYvk0",
})(Page)
