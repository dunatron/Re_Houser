import React, { Component, useState, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { StripeProvider } from 'react-stripe-elements';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ToastContainer, toast } from 'react-toastify';
import MaterialPage from './MaterialPage';

import { StateProvider } from '../../store';

import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import Meta from '../Meta/index';
// Material UI
import NoSsr from '@material-ui/core/NoSsr';
import muiTheme from '../../styles/_muiTheme';

// Admin Area Addisions
import AdminAlertNewRentalApplicationSub from '../SubscriptionComponents/AdminAlertNewRentalApplicationSub';
import AdminAlertsContainer from '../../containers/AdminAlertsContainer';
import GeneralSubsContainer from '../../containers/GeneralSubsContainer';

// theme typography
import themeTypography from '../../styles/_themeTypography';

// Google
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

// TRIAL ONLY
import WithUser from '../WithUser';
import WithChats from '../WithChats.js';
import THEME_PICKER_CONFIG from '../../lib/configs/themePickerConfig';

// const theme = createMuiTheme(muiTheme);
const theme = createMuiTheme({
  ...muiTheme,
  palette: {
    ...muiTheme.palette,
  },
  ...themeTypography,
});

import Router from 'next/router';
import NProgress from 'nprogress';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

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
  @font-face {
    font-family: "Allison";
    src: url('/static/fonts/Gustan-Light.woff') format('woff'); /* IE9 Compat Modes */
    font-style:   normal;
    font-weight:  200;
  }
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
  
`;

/**
 * Do do this =>https://spectrum.chat/next-js/general/how-do-i-setup-a-global-toast-notification-system-using-next-js-i-am-using-next-alongside-apollo-client-and-graphql~211bf34c-56c2-4fee-bb04-c64f73a0cdfd
 */
const Page = props => {
  const [stripe, setStripe] = useState(null);

  const { google } = props;
  useEffect(() => {
    if (window.Stripe) {
      setStripe(window.Stripe(process.env.STRIPE_KEY));
    }
  }, [window.Stripe]);

  const handleDefaultDragover = e => {
    e = e || event;
    e.preventDefault();
  };

  const handleDefaultDrop = e => {
    e = e || event;
    e.preventDefault();
  };

  // I think we should disable default onDrop for window while a drag and drop element is present
  // Simply in the case they drag it onto the site and not the drop area
  useEffect(() => {
    window.addEventListener('dragover', handleDefaultDragover, false);
    window.addEventListener('drop', handleDefaultDrop, false);
    return () => {
      window.removeEventListener('dragover', handleDefaultDragover);
      window.removeEventListener('drop', handleDefaultDrop);
    };
  }, []);

  useEffect(() => {
    console.log('render: ROOT Page useEffect');
    return () => {
      console.log('render: ROOT Page useEffect cleanup');
    };
  }, []);

  return (
    <NoSsr>
      {/* Maybe toast go at bottom. as in bubble up effect of solve this to solve that below */}
      {/* <StateProvider> */}
      <MuiThemeProvider theme={theme}>
        <ToastContainer
          rtl={false}
          style={{
            minWidth: '280px',
          }}
          closeButton={
            <div>
              <IconButton color={'default'} aria-label="Delete">
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
          }
        />
        <ThemeProvider theme={theme}>
          <Elements stripe={stripe}>
            <WithUser>
              {/* <WithChats> */}
              <Meta />
              <MaterialPage children={props.children} />
              {/* <MaterialPage /> */}
              <AdminAlertsContainer />
              <GeneralSubsContainer />
            </WithUser>
          </Elements>
        </ThemeProvider>
        <div id="modal-root" />
        <GlobalStyle />
      </MuiThemeProvider>
      {/* </StateProvider> */}
    </NoSsr>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_API_KEY,
})(Page);
