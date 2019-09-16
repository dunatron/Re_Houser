import React, { Component, useState, useEffect } from "react"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import { StripeProvider } from "react-stripe-elements"
import Head from "next/head"
import { ToastContainer, toast } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"

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
// alert
import { transitions, positions, Provider as AlertProvider } from "react-alert"
import AlertTemplate from "../AlertTemplate.js/index"
import { ALERT_OPTIONS } from "../../lib/configs/alertConfig"

//Admin ARea Addisions
import AdminAlertNewRentalApplicationSub from "../SubscriptionComponents/AdminAlertNewRentalApplicationSub"
import AdminAlertsContainer from "../../containers/AdminAlertsContainer"

// Google
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react"

// TRIAL ONLY
import WithUser from "../WithUser"

const theme = createMuiTheme(muiTheme)

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth}px;
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
       box-shadow: 0 0 10px ${theme.palette.secondary.main}, 0 0 5px ${theme.palette.secondary.main};
    }
  }
  
`

const alertOptions = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
}

/**
 * Do do this =>https://spectrum.chat/next-js/general/how-do-i-setup-a-global-toast-notification-system-using-next-js-i-am-using-next-alongside-apollo-client-and-graphql~211bf34c-56c2-4fee-bb04-c64f73a0cdfd
 */

const Page = props => {
  const [stripe, setStripe] = useState(null)
  const { google } = props
  useEffect(() => {
    if (window.Stripe) {
      console.log("SETTING THE STRIPE KEY ===>>")
      setStripe(window.Stripe("pk_test_CRnQzE6AWCNnYIbKLLLI7ZDx00DSpHVI1N"))
    } else {
      console.log("WE NEED A WAY TO LOAD IT ASYCLY ")
    }
    // window.Stripe
    //   ? setStripe(window.Stripe("AIzaSyDe_TIz2AQ9mKfYpsb6U3RG7fjnM8eYvk0"))
    //   : null
  }, [window.Stripe])
  return (
    <NoSsr>
      {/* Maybe toast go at bottom. as in bubble up effect of solve this to solve that below */}
      <ToastContainer
        rtl={false}
        closeButton={
          <div>
            <IconButton
              color={"default"}
              aria-label="Delete"
              // className={classes.closeBtn}
              // onClick={() => close()}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        }
      />
      <MuiThemeProvider theme={theme}>
        <StripeProvider stripe={stripe}>
          <ThemeProvider theme={theme}>
            <AlertProvider template={AlertTemplate} {...ALERT_OPTIONS}>
              <WithUser>
                <StyledPage>
                  <Meta />
                  <Header />
                  <Inner>{props.children}</Inner>

                  {/* <div>
                  <h1>Admin alerts LOL</h1>
                  <AdminAlertsContainer />
                </div> */}
                </StyledPage>
              </WithUser>
            </AlertProvider>
          </ThemeProvider>
        </StripeProvider>
      </MuiThemeProvider>
      <GlobalStyle />
      <div id="modal-root" />
    </NoSsr>
  )
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDe_TIz2AQ9mKfYpsb6U3RG7fjnM8eYvk0",
})(Page)
