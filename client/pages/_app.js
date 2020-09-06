import App, { Container } from 'next/app';
import Page from '../components/Page/index';
// import { ApolloProvider } from 'react-apollo';
import { ApolloProvider } from '@apollo/client';
import withData from '../lib/withData';
import Head from 'next/head';
import GlobalStyle from '../components/Page/GlobalStyle';
import WithUser from '../components/WithUser';
import { ToastContainer, toast } from 'react-toastify';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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
        <GlobalStyle />
        <Head>
          <script src="https://js.stripe.com/v3/" />
          <script src="https://cdn.rawgit.com/progers/pathseg/master/pathseg.js"></script>
        </Head>
        <ToastContainer
          rtl={false}
          style={{
            minWidth: '280px',
          }}
          closeButton={
            <div>
              <IconButton color={'default'} aria-label="Delete">
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
          }
        />
        <WithUser>
          <Page>
            <Component {...pageProps} />
          </Page>
        </WithUser>
      </ApolloProvider>
    );
  }
}

export default withData(AppEntryPointExtension);
