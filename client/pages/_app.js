import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';
import { useEffect } from 'react';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import Page from '@/Components/Page/index';

// import css for SSR
import '../public/css/rehouser-fonts.css';
import '../public/css/customToast.css';
import '../public/css/geosuggest.css';
import '../public/css/nprogress.css';

function App(props) {
  const { Component, pageProps } = props;
  const apolloClient = useApollo(pageProps);
  console.log('APP ROOT pageProps => ', pageProps);

  // using next-pwa
  // useEffect(() => {
  //   if ('serviceWorker' in navigator) {
  //     window.addEventListener('load', function() {
  //       navigator.serviceWorker.register('/sw.js').then(
  //         function(registration) {
  //           console.log(
  //             'Service Worker registration successful with scope: ',
  //             registration.scope
  //           );
  //         },
  //         function(err) {
  //           console.log('Service Worker registration failed: ', err);
  //         }
  //       );
  //     });
  //   }
  // }, []);

  return (
    <RecoilRoot>
      <ApolloProvider client={apolloClient}>
        <Head>
          {/* TIP: set viewport head meta tag in _app.js, otherwise it will show a warning */}
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          />
          {/* <script src="https://js.stripe.com/v3/" /> */}
          <script src="https://cdn.rawgit.com/progers/pathseg/master/pathseg.js"></script>
        </Head>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ApolloProvider>
    </RecoilRoot>
  );
}

export default App;
