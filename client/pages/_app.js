import App, { Container } from 'next/app';
import Page from '../components/Page/index';
// import { ApolloProvider } from 'react-apollo';
import { ApolloProvider } from '@apollo/client';
import withData from '../lib/withData';
import Head from 'next/head';
import { StateProvider } from '../store';
import { FacebookProvider, Like } from 'react-facebook';
// import LogRocket from 'logrocket';

// LogRocket.init('fxgdt9/rehouser');

class AppEntryPointExtension extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props;
    return (
      <ApolloProvider client={apollo}>
        <FacebookProvider appId={process.env.FACEBOOK_APP_ID} chatSupport>
          <StateProvider>
            <Head>
              <script src="https://js.stripe.com/v3/" />
              <script src="https://cdn.rawgit.com/progers/pathseg/master/pathseg.js"></script>
            </Head>
            <Page>
              <Component {...pageProps} />
            </Page>
          </StateProvider>
        </FacebookProvider>
      </ApolloProvider>
    );
  }
}

export default withData(AppEntryPointExtension);
