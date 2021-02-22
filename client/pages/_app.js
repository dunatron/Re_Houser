// import { ApolloProvider } from '@apollo/client';
// import { useApollo } from '../lib/apolloClient';
// import Head from 'next/head';
// import { RecoilRoot } from 'recoil';
// import Page from '@/Components/Page/index';

// // import css for SSR
// // import '../public/css/rehouser-fonts.css';
// import '../public/css/customToast.css';
// import '../public/css/geosuggest.css';
// import '../public/css/nprogress.css';

// function App(props) {
//   const { Component, pageProps } = props;
//   const apolloClient = useApollo(pageProps);

//   return (
//     <RecoilRoot>
//       <ApolloProvider client={apolloClient}>
//         <Head>
//           {/* TIP: set viewport head meta tag in _app.js, otherwise it will show a warning */}
//           <meta
//             name="viewport"
//             content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
//           />
//           {/* <script src="https://js.stripe.com/v3/" /> */}
//           <script src="https://cdn.rawgit.com/progers/pathseg/master/pathseg.js"></script>
//         </Head>
//         <Page>
//           <Component {...pageProps} />
//         </Page>
//       </ApolloProvider>
//     </RecoilRoot>
//   );
// }

// export default App;

// import { ApolloProvider } from '@apollo/client';
// import NProgress from 'nprogress';
// import Router from 'next/router';
// import Page from '../components/Page';
// // import '../components/styles/nprogress.css';
// import withData from '../lib/withData';
// import { RecoilRoot } from 'recoil';
// // import { CartStateProvider } from '../lib/cartState';

// Router.events.on('routeChangeStart', () => NProgress.start());
// Router.events.on('routeChangeComplete', () => NProgress.done());
// Router.events.on('routeChangeError', () => NProgress.done());

// function MyApp({ Component, pageProps, apollo }) {
//   return (
//     <RecoilRoot>
//       {' '}
//       <ApolloProvider client={apollo}>
//         {/* <CartStateProvider> */}
//         <Page>
//           <Component {...pageProps} />
//         </Page>
//         {/* </CartStateProvider> */}
//       </ApolloProvider>
//     </RecoilRoot>
//   );
// }

// MyApp.getInitialProps = async function({ Component, ctx }) {
//   let pageProps = {};
//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx);
//   }
//   pageProps.query = ctx.query;
//   return { pageProps };
// };

// export default withData(MyApp);

import { ApolloProvider } from '@apollo/client';
// import { useApollo } from '../lib/apolloClient';

import withData from '../lib/withData';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import Page from '@/Components/Page/index';

// import css for SSR
// import '../public/css/rehouser-fonts.css';
import '../public/css/customToast.css';
import '../public/css/geosuggest.css';
import '../public/css/nprogress.css';

function RehouserApp(props) {
  const { Component, pageProps, apollo } = props;
  // const apolloClient = useApollo(pageProps);

  return (
    <RecoilRoot>
      <ApolloProvider client={apollo}>
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
        {/* <h1>Hello from Hell</h1> */}
      </ApolloProvider>
    </RecoilRoot>
  );
}

export default withData(RehouserApp);
