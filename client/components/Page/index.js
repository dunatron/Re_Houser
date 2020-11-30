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
// import AdminAlertsContainer from '@/Containers/AdminAlertsContainer';
// import GeneralSubsContainer from '@/Containers/GeneralSubsContainer';
import NoSSRGeneralSubs from '@/Containers/NoSSRGeneralSubs';
import NoSSRAdminAlertsSub from '@/Containers/NoSSRAdminAlertsSub';

import GlobalStyle from './GlobalStyle';

// Google
import { GoogleApiWrapper } from 'google-maps-react';

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
  useEffect(() => {
    if (window.Stripe) {
      setStripe(window.Stripe(process.env.STRIPE_KEY));
    }
  }, []);

  // This hook only run once in browser after the component is rendered for the first time.
  // It has same effect as the old componentDidMount lifecycle callback.
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      window.workbox !== undefined
    ) {
      const wb = window.workbox;
      // add event listeners to handle any of PWA lifecycle event
      // https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-window.Workbox#events
      wb.addEventListener('installed', event => {
        // console.log(`Event ${event.type} is triggered.`);
        // console.log(event);
      });

      wb.addEventListener('controlling', event => {
        // console.log(`Event ${event.type} is triggered.`);
        // console.log(event);
      });

      wb.addEventListener('activated', event => {
        // console.log(`Event ${event.type} is triggered.`);
        // console.log(event);
      });

      // A common UX pattern for progressive web apps is to show a banner when a service worker has updated and waiting to install.
      // NOTE: MUST set skipWaiting to false in next.config.js pwa object
      // https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
      const promptNewVersionAvailable = event => {
        // `event.wasWaitingBeforeRegister` will be false if this is the first time the updated service worker is waiting.
        // When `event.wasWaitingBeforeRegister` is true, a previously updated service worker is still waiting.
        // You may want to customize the UI prompt accordingly.
        if (
          confirm(
            'A newer version of this web app is available, reload to update?'
          )
        ) {
          wb.addEventListener('controlling', event => {
            window.location.reload();
          });

          // Send a message to the waiting service worker, instructing it to activate.
          wb.messageSW({ type: 'SKIP_WAITING' });
        } else {
          console.log(
            'User rejected to reload the web app, keep using old version. New version will be automatically load when user open the app next time.'
          );
        }
      };

      wb.addEventListener('waiting', promptNewVersionAvailable);
      wb.addEventListener('externalwaiting', promptNewVersionAvailable);

      // ISSUE - this is not working as expected, why?
      // I could only make message event listenser work when I manually add this listenser into sw.js file
      wb.addEventListener('message', event => {
        console.log(`Event ${event.type} is triggered.`);
        console.log(event);
      });

      /*
      wb.addEventListener('redundant', event => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })
      wb.addEventListener('externalinstalled', event => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })
      wb.addEventListener('externalactivated', event => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })
      */

      // never forget to call register as auto register is turned off in next.config.js
      wb.register();
    }
  }, []);

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
                  {/* <AdminAlertsContainer /> */}
                  {/* <NoSSRAdminAlertsSub /> */}
                  <NoSSRGeneralSubs />
                  {/* <NoSsr>
                    <AdminAlertsContainer />
                    <NoSSRGeneralSubs />
                  </NoSsr> */}
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

// const Page = props => {
//   console.log('Props passed to base Page => ', props);
//   const [stripe, setStripe] = useState(null);
//   useEffect(() => {
//     if (window.Stripe) {
//       setStripe(window.Stripe(process.env.STRIPE_KEY));
//     }
//   }, []);

//   const handleDefaultDragover = e => {
//     e = e || event;
//     e.preventDefault();
//   };

//   const handleDefaultDrop = e => {
//     e = e || event;
//     e.preventDefault();
//   };

//   // I think we should disable default onDrop for window while a drag and drop element is present
//   // Simply in the case they drag it onto the site and not the drop area
//   useEffect(() => {
//     window.addEventListener('dragover', handleDefaultDragover, false);
//     window.addEventListener('drop', handleDefaultDrop, false);
//     return () => {
//       window.removeEventListener('dragover', handleDefaultDragover);
//       window.removeEventListener('drop', handleDefaultDrop);
//     };
//   }, []);

//   const [themeObj, setThemeObj] = useRecoilState(themeState);

//   const theme = createMuiTheme({
//     ...themeObj,
//   });

//   return <div>LOL</div>;
// };

// Page.propTypes = {
//   children: PropTypes.any,
// };

// export default Page;

// export default GoogleApiWrapper({
//   apiKey: process.env.GOOGLE_API_KEY,
// })(Page);

// import PropTypes from 'prop-types';
// import React, { useState, useEffect } from 'react';
// import { ThemeProvider } from 'styled-components';
// import { Elements } from '@stripe/react-stripe-js';
// import { StateProvider } from '@/Store/index';

// import MaterialPage from './MaterialPage';
// import { FacebookProvider, Like } from 'react-facebook';

// import CustomToastContainer from '@/Containers/CustomToastContainer';

// import { MuiThemeProvider } from '@material-ui/core/styles';
// import Meta from '../Meta/index';

// // Admin Area Addisions
// import AdminAlertsContainer from '@/Containers/AdminAlertsContainer';
// import GeneralSubsContainer from '@/Containers/GeneralSubsContainer';
// import NoSSRGeneralSubs from '@/Containers/NoSSRGeneralSubs';

// import GlobalStyle from './GlobalStyle';

// // Google
// import { GoogleApiWrapper } from 'google-maps-react';

// import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// import MomentUtils from '@date-io/moment';

// import WithUser from '@/Components/WithUser';

// import Router from 'next/router';
// import NProgress from 'nprogress';

// import CssBaseline from '@material-ui/core/CssBaseline';
// import { useRecoilState } from 'recoil';
// import { themeState } from '@/Recoil/themeState';
// import { createMuiTheme } from '@material-ui/core/styles';

// Router.onRouteChangeStart = () => {
//   NProgress.start();
// };

// Router.onRouteChangeComplete = () => {
//   NProgress.done();
// };

// Router.onRouteChangeError = () => {
//   NProgress.done();
// };

/**
 * Do do this =>https://spectrum.chat/next-js/general/how-do-i-setup-a-global-toast-notification-system-using-next-js-i-am-using-next-alongside-apollo-client-and-graphql~211bf34c-56c2-4fee-bb04-c64f73a0cdfd
 */
// const Page = props => {
//   console.log('Props passed to base Page => ', props);
//   const [stripe, setStripe] = useState(null);
//   useEffect(() => {
//     if (window.Stripe) {
//       setStripe(window.Stripe(process.env.STRIPE_KEY));
//     }
//   }, [window.Stripe]);

//   const handleDefaultDragover = e => {
//     e = e || event;
//     e.preventDefault();
//   };

//   const handleDefaultDrop = e => {
//     e = e || event;
//     e.preventDefault();
//   };

//   // I think we should disable default onDrop for window while a drag and drop element is present
//   // Simply in the case they drag it onto the site and not the drop area
//   useEffect(() => {
//     window.addEventListener('dragover', handleDefaultDragover, false);
//     window.addEventListener('drop', handleDefaultDrop, false);
//     return () => {
//       window.removeEventListener('dragover', handleDefaultDragover);
//       window.removeEventListener('drop', handleDefaultDrop);
//     };
//   }, []);

//   const [themeObj, setThemeObj] = useRecoilState(themeState);

//   const theme = createMuiTheme({
//     ...themeObj,
//   });

//   return (
//     <MuiThemeProvider theme={theme}>
//       <CssBaseline />
//       <Meta />
//       <GlobalStyle theme={theme} />
//       <CustomToastContainer />
//       <ThemeProvider theme={theme}>
//         <FacebookProvider appId={process.env.FACEBOOK_APP_ID} chatSupport>
//           <MuiPickersUtilsProvider utils={MomentUtils}>
//             <StateProvider>
//               <Elements stripe={stripe}>
//                 <WithUser>
//                   <MaterialPage children={props.children} {...props} />
//                   <AdminAlertsContainer />
//                   <NoSSRGeneralSubs />
//                 </WithUser>
//               </Elements>
//             </StateProvider>
//           </MuiPickersUtilsProvider>
//         </FacebookProvider>
//       </ThemeProvider>
//     </MuiThemeProvider>
//   );
// };

// const Page = props => {
//   console.log('Props passed to base Page => ', props);
//   const [stripe, setStripe] = useState(null);
//   useEffect(() => {
//     if (window.Stripe) {
//       setStripe(window.Stripe(process.env.STRIPE_KEY));
//     }
//   }, [window.Stripe]);

//   const handleDefaultDragover = e => {
//     e = e || event;
//     e.preventDefault();
//   };

//   const handleDefaultDrop = e => {
//     e = e || event;
//     e.preventDefault();
//   };

//   // I think we should disable default onDrop for window while a drag and drop element is present
//   // Simply in the case they drag it onto the site and not the drop area
//   useEffect(() => {
//     window.addEventListener('dragover', handleDefaultDragover, false);
//     window.addEventListener('drop', handleDefaultDrop, false);
//     return () => {
//       window.removeEventListener('dragover', handleDefaultDragover);
//       window.removeEventListener('drop', handleDefaultDrop);
//     };
//   }, []);

//   const [themeObj, setThemeObj] = useRecoilState(themeState);

//   const theme = createMuiTheme({
//     ...themeObj,
//   });

//   return <div>LOL</div>;
// };

// Page.propTypes = {
//   children: PropTypes.any,
// };

// export default Page;
