import App, { Container } from 'next/app';
import Page from '@/Components/Page/index';
import { ApolloProvider } from '@apollo/client';
import withData from '@/Lib/withData';
import Head from 'next/head';
import 'react-virtualized/styles.css'; // only needs to be imported once
import { RecoilRoot } from 'recoil';

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
      <RecoilRoot>
        <ApolloProvider client={apollo}>
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
}

export default withData(AppEntryPointExtension);
