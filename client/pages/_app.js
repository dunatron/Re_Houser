import App, { Container } from 'next/app';
import Page from '@/Components/Page/index';
import { ApolloProvider } from '@apollo/client';
import withData from '@/Lib/withData';
import Head from 'next/head';
import 'react-virtualized/styles.css'; // only needs to be imported once
import 'react-toastify/dist/ReactToastify.css'; // not using custom link css. check GlobalStyle in Page component
import { RecoilRoot } from 'recoil';
import { CURRENT_USER_QUERY } from '@/Gql/queries';
// import CustomToastContainer from '@/Containers/CustomToastContainer';

class AppEntryPointExtension extends App {
  static async getInitialProps({ Component, ctx }) {
    // console.log('WHAT IS CTX => ', ctx);
    const {
      pathname,
      query,
      asPath,
      req,
      res,
      err,
      AppTree,
      apolloClient,
    } = ctx;

    // get me you muppet
    // const {
    //   data: { me },
    //   loading,
    //   networkStatus,
    // } = await apolloClient.query({
    //   query: CURRENT_USER_QUERY,
    //   fetchPolicy: 'cache-first',
    // });

    // console.log('Store from initalProps => ', store);
    // console.log('Store from isServer => ', isServer);
    // console.log('Store from query => ', query);
    // console.log('Store from req => ', req.cookies);
    // let pageProps = {};
    // if (Component.getInitialProps) {
    //   pageProps = await Component.getInitialProps(ctx);
    // }

    // await apolloClient.query({
    //   query: CURRENT_USER_QUERY,
    // });

    let pageProps = {
      // me: me,
      cookies: req?.cookies,
    };
    if (Component.getInitialProps) {
      const pageToRenderinitialProps = await Component.getInitialProps(ctx);
      console.log('pageToRenderinitialProps => ', pageToRenderinitialProps);
      pageProps = {
        ...pageProps,
        ...pageToRenderinitialProps,
      };
    }

    // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props;
    console.log('WHat is this props => ', this.props);
    return (
      <RecoilRoot>
        {/* <CustomToastContainer /> */}
        <ApolloProvider client={apollo}>
          <Head>
            {/* <script src="https://js.stripe.com/v3/" /> */}
            <script src="https://cdn.rawgit.com/progers/pathseg/master/pathseg.js"></script>
          </Head>
          <Page>
            <Component {...pageProps} apollo={apollo} />
          </Page>
        </ApolloProvider>
      </RecoilRoot>
    );
  }
}

export default withData(AppEntryPointExtension);
