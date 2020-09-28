import PropTypes from 'prop-types';
import React, { Component, useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Elements } from '@stripe/react-stripe-js';
import { StateProvider } from '@/Store/index';

import MaterialPage from './MaterialPage';
import { FacebookProvider, Like } from 'react-facebook';
import CustomToastContainer from '@/Containers/CustomToastContainer';

// recoil/state management
import { RecoilRoot } from 'recoil';

import { MuiThemeProvider } from '@material-ui/core/styles';
import Meta from '../Meta/index';
// Material UI
// import theme from './theme';

import themeTypography from '@/Styles/_themeTypography';
import muiTheme from '@/Styles/_muiTheme';

// Admin Area Addisions
import AdminAlertsContainer from '@/Containers/AdminAlertsContainer';
import GeneralSubsContainer from '@/Containers/GeneralSubsContainer';

import GlobalStyle from './GlobalStyle';

// Google
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import WithUser from '@/Components/WithUser';

import Router from 'next/router';
import NProgress from 'nprogress';

import { createMuiTheme } from '@material-ui/core/styles';

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
  const [themeObj, setThemeObj] = useState({});
  useEffect(() => {
    if (window.Stripe) {
      console.log('Window Stripe => ', window.Stripe);
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

  const theme = createMuiTheme({
    ...muiTheme,
    ...themeObj,
    // palette: {
    //   ...muiTheme.palette,
    // },
    ...themeTypography,
  });

  return (
    <RecoilRoot>
      <MuiThemeProvider theme={theme}>
        <Meta />
        <GlobalStyle />
        <CustomToastContainer />
        <ThemeProvider theme={theme}>
          <FacebookProvider appId={process.env.FACEBOOK_APP_ID} chatSupport>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <StateProvider>
                <Elements stripe={stripe}>
                  <WithUser>
                    <MaterialPage
                      children={props.children}
                      {...props}
                      setTheme={obj => setThemeObj(obj)}
                    />
                    <AdminAlertsContainer />
                    <GeneralSubsContainer />
                  </WithUser>
                </Elements>
              </StateProvider>
            </MuiPickersUtilsProvider>
          </FacebookProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </RecoilRoot>
  );
};

Page.propTypes = {
  children: PropTypes.any.isRequired,
};

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_API_KEY,
})(Page);
