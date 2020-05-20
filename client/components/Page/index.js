import React, { Component, useState, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { StripeProvider } from 'react-stripe-elements';
import { ToastContainer, toast } from 'react-toastify';
import MaterialPage from './MaterialPage';

import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import Meta from '../Meta/index';
// Material UI
import NoSsr from '@material-ui/core/NoSsr';
import muiTheme from '../../styles/_muiTheme';
import lightPalette from '../../styles/_lightMUIPalette';
import darkPalette from '../../styles/_darkMUIPalette';

// Admin Area Addisions
import AdminAlertNewRentalApplicationSub from '../SubscriptionComponents/AdminAlertNewRentalApplicationSub';
import AdminAlertsContainer from '../../containers/AdminAlertsContainer';

// Google
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

// TRIAL ONLY
import WithUser from '../WithUser';
import WithChats from '../WithChats.js';
import THEME_PICKER_CONFIG from '../../lib/configs/themePickerConfig';

// const theme = createMuiTheme(muiTheme);
const theme = createMuiTheme({
  ...muiTheme,
  // palette: {
  //   ...muiTheme.palette,
  //   ...lightPalette.palette,
  // },
  // palette: {
  //   ...muiTheme.palette,
  //   ...lightPalette.palette,
  // },
  palette: {
    ...muiTheme.palette,
    ...lightPalette.palette,
  },
});

const darkTheme = createMuiTheme({
  ...muiTheme,
  palette: {
    ...muiTheme.palette,
    ...darkPalette.palette,
  },
  overrides: {
    MuiAppBar: { colorPrimary: { backgroundColor: '#212121', color: '#fff' } },
  },
});
const lightTheme = createMuiTheme({
  ...muiTheme,
  palette: {
    ...muiTheme.palette,
    ...lightPalette.palette,
  },
});

import Router from 'next/router';
import NProgress from 'nprogress';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
  // NProgress.start()
};

Router.onRouteChangeError = () => {
  NProgress.done();
  // NProgress.start()
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
    /* src: url('/static/fonts/Allison_Script.otf') format('otf');  */
    src: url('/static/fonts/Gustan-Light.woff') format('woff'); /* IE9 Compat Modes */
    font-style:   normal;
    font-weight:  200;
  }
  html {
    box-sizing: border-box;
    /* font-size: 10px; */
    /* font-size: 16px; */
    font-size: 14px;
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
  
`;

const defaultTheme = createMuiTheme({
  ...muiTheme,
  ...THEME_PICKER_CONFIG[0],
});

/**
 * Do do this =>https://spectrum.chat/next-js/general/how-do-i-setup-a-global-toast-notification-system-using-next-js-i-am-using-next-alongside-apollo-client-and-graphql~211bf34c-56c2-4fee-bb04-c64f73a0cdfd
 */
const Page = props => {
  const [stripe, setStripe] = useState(null);
  const [useDarkTheme, setUseDarkTheme] = useState(false); // should set localStorage for this so each  device can remember its theme choice
  const [userTheme, setUserTheme] = useState(defaultTheme);
  const { google } = props;
  useEffect(() => {
    if (window.Stripe) {
      setStripe(window.Stripe(process.env.STRIPE_KEY));
    }
  }, [window.Stripe]);
  const themeToUse = useDarkTheme ? darkTheme : lightTheme;

  const handleSetUserTheme = theme => {
    const myMadeTheme = createMuiTheme({
      ...muiTheme,
      ...theme,
      palette: {
        ...muiTheme.palette,
        ...theme.palette,
      },
    });
    setUserTheme(myMadeTheme);
  };

  return (
    <NoSsr>
      {/* Maybe toast go at bottom. as in bubble up effect of solve this to solve that below */}

      <MuiThemeProvider theme={themeToUse}>
        <ToastContainer
          rtl={false}
          style={{
            // width: 'unset',
            minWidth: '280px',
          }}
          closeButton={
            <div>
              <IconButton
                color={'default'}
                aria-label="Delete"
                // className={classes.closeBtn}
                // onClick={() => close()}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
          }
        />
        <StripeProvider stripe={stripe}>
          <ThemeProvider theme={userTheme}>
            <WithUser>
              {/* <WithChats> */}
              <Meta />
              <MaterialPage
                children={props.children}
                {...props}
                setTheme={handleSetUserTheme}
                toggleTheme={() => {
                  setUseDarkTheme(!useDarkTheme);
                }}
              />

              {/* <div>
                  <h1>Admin alerts LOL</h1>
                  <AdminAlertsContainer />
                </div> */}
              {/* </WithChats> */}
            </WithUser>
          </ThemeProvider>
        </StripeProvider>
        <div id="modal-root" />
        <GlobalStyle />
      </MuiThemeProvider>
    </NoSsr>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_API_KEY,
})(Page);
