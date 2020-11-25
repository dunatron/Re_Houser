// import App, { Container } from 'next/app';
// import Page from '@/Components/Page/index';
// import { ApolloProvider } from '@apollo/client';
// import withData from '@/Lib/withData';
// import Head from 'next/head';
// import 'react-virtualized/styles.css'; // only needs to be imported once
// import 'react-toastify/dist/ReactToastify.css'; // not using custom link css. check GlobalStyle in Page component
// import { RecoilRoot } from 'recoil';
// import { CURRENT_USER_QUERY } from '@/Gql/queries';
// // import CustomToastContainer from '@/Containers/CustomToastContainer';

// class AppEntryPointExtension extends App {
//   static async getInitialProps({ Component, ctx }) {
//     // console.log('WHAT IS CTX => ', ctx);
//     const {
//       pathname,
//       query,
//       asPath,
//       req,
//       res,
//       err,
//       AppTree,
//       apolloClient,
//     } = ctx;

//     // get me you muppet
//     // const {
//     //   data: { me },
//     //   loading,
//     //   networkStatus,
//     // } = await apolloClient.query({
//     //   query: CURRENT_USER_QUERY,
//     //   fetchPolicy: 'cache-first',
//     // });

//     // console.log('Store from initalProps => ', store);
//     // console.log('Store from isServer => ', isServer);
//     // console.log('Store from query => ', query);
//     // console.log('Store from req => ', req.cookies);
//     // let pageProps = {};
//     // if (Component.getInitialProps) {
//     //   pageProps = await Component.getInitialProps(ctx);
//     // }

//     // await apolloClient.query({
//     //   query: CURRENT_USER_QUERY,
//     // });

//     let pageProps = {
//       // me: me,
//       cookies: req?.cookies,
//     };
//     if (Component.getInitialProps) {
//       const pageToRenderinitialProps = await Component.getInitialProps(ctx);
//       console.log('pageToRenderinitialProps => ', pageToRenderinitialProps);
//       pageProps = {
//         ...pageProps,
//         ...pageToRenderinitialProps,
//       };
//     }

//     // this exposes the query to the user
//     pageProps.query = ctx.query;
//     return { pageProps };
//   }

//   render() {
//     const { Component, apollo, pageProps } = this.props;
//     console.log('WHat is this props => ', this.props);
//     return (
//       <RecoilRoot>
//         {/* <CustomToastContainer /> */}
//         <ApolloProvider client={apollo}>
//           <Head>
//             {/* <script src="https://js.stripe.com/v3/" /> */}
//             <script src="https://cdn.rawgit.com/progers/pathseg/master/pathseg.js"></script>
//           </Head>
//           <Page>
//             <Component {...pageProps} apollo={apollo} />
//           </Page>
//         </ApolloProvider>
//       </RecoilRoot>
//     );
//   }
// }

// export default withData(AppEntryPointExtension);

import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import Page from '@/Components/Page/index';

import { parseCookies, setCookie, destroyCookie } from 'nookies';

import { initializeApollo, addApolloState } from '../lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);

  console.log('WHY NOT CHANGE THEM HERE?');

  return (
    <RecoilRoot>
      <ApolloProvider client={apolloClient}>
        <Head>
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
// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//

App.getInitialProps = async ({ ctx }) => {
  // // calls page's `getInitialProps` and fills `appProps.pageProps`
  // // const appProps = await App.getInitialProps(appContext);

  // return {};
  console.log('Tell me ctx => ', ctx.req.headers);
  const cookies = parseCookies(ctx);

  console.log('Give me a look at these paassed cookies => ', cookies);

  setCookie(ctx, 'fromGetServerSideProps', 'value', {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });

  const apolloClient = initializeApollo(null, ctx.req.headers);

  await apolloClient.query({
    query: CURRENT_USER_QUERY,
  });

  return addApolloState(apolloClient, {
    props: {},
    // revalidate: 1,
  });
};

export default App;
