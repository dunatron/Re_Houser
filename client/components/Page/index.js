import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { Elements } from '@stripe/react-stripe-js';
import { StateProvider } from '@/Store/index';

import MaterialPage from './MaterialPage';
import { FacebookProvider, Like } from 'react-facebook';

import CustomToastContainer from '@/Containers/CustomToastContainer';

import { MuiThemeProvider } from '@material-ui/core/styles';
import Meta from '../Meta/index';

// Admin Area Addisions
import NoSSRGeneralSubs from '@/Containers/NoSSRGeneralSubs';
import NoSSRAdminAlertsSub from '@/Containers/NoSSRAdminAlertsSub';

import GlobalStyle from './GlobalStyle';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import WithUser from '@/Components/WithUser';

import Router from 'next/router';
import NProgress from 'nprogress';

import CssBaseline from '@material-ui/core/CssBaseline';
import { useRecoilState } from 'recoil';
import { themeState } from '@/Recoil/themeState';
import { createMuiTheme } from '@material-ui/core/styles';
import { NoSsr } from '@material-ui/core';
import useServiceWorker from '@/Lib/hooks/useServiceWorker';
import useDisableDrop from '@/Lib/hooks/useDisableDrop';
import useDisableDragover from '@/Lib/hooks/useDisableDragover';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const SubLoader = () => {
  return <div>Loading General Notifications</div>;
};

/**
 * Do do this =>https://spectrum.chat/next-js/general/how-do-i-setup-a-global-toast-notification-system-using-next-js-i-am-using-next-alongside-apollo-client-and-graphql~211bf34c-56c2-4fee-bb04-c64f73a0cdfd
 */
const Page = props => {
  const [stripe, setStripe] = useState(null);

  useServiceWorker();
  useDisableDrop();
  useDisableDragover();

  useEffect(() => {
    if (window.Stripe) {
      setStripe(window.Stripe(process.env.STRIPE_KEY));
    }
  }, []);

  const [themeObj, setThemeObj] = useRecoilState(themeState);

  const theme = createMuiTheme({
    ...themeObj,
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Meta />
      <GlobalStyle theme={theme} />
      <CustomToastContainer />
      <ThemeProvider theme={theme}>
        <FacebookProvider appId={process.env.FACEBOOK_APP_ID} chatSupport>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <StateProvider>
              <Elements stripe={stripe}>
                <WithUser>
                  <MaterialPage children={props.children} {...props} />
                  <NoSSRAdminAlertsSub />
                  <NoSSRGeneralSubs />
                </WithUser>
              </Elements>
            </StateProvider>
          </MuiPickersUtilsProvider>
        </FacebookProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

export default Page;
