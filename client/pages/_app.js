import App, { Container } from 'next/app';
import Page from '../components/Page/index';
// import { ApolloProvider } from 'react-apollo';
import { ApolloProvider } from '@apollo/client';
import withData from '../lib/withData';
import Head from 'next/head';
import { StateProvider } from '../store';

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
        <StateProvider>
          <Head>
            <script src="https://js.stripe.com/v3/" />
          </Head>
          <Page>
            <Component {...pageProps} />
          </Page>
        </StateProvider>
      </ApolloProvider>
    );
  }
}

export default withData(AppEntryPointExtension);
