import React, { Component, useState, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { StripeProvider } from 'react-stripe-elements';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ToastContainer, toast } from 'react-toastify';
import MaterialPage from './MaterialPage';
import { FacebookProvider, Like } from 'react-facebook';

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

  return (
    <MuiThemeProvider theme={theme}>
      <Meta />
      {/* <GlobalStyle /> */}
      {/* <ToastContainer
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
      /> */}
      <ThemeProvider theme={theme}>
        <FacebookProvider appId={process.env.FACEBOOK_APP_ID} chatSupport>
          <StateProvider>
            <Elements stripe={stripe}>
              {/* <WithUser> */}
              <MaterialPage children={props.children} {...props} />
              <AdminAlertsContainer />
              <GeneralSubsContainer />
              {/* </WithUser> */}
            </Elements>
          </StateProvider>
        </FacebookProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_API_KEY,
})(Page);
