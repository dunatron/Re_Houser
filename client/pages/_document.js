import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

import { ServerStyleSheet as StyledComponentSheets } from 'styled-components';
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/core/styles';

// service worker https://itnext.io/pwa-with-next-js-create-next-app-in-2020-%EF%B8%8F-9ee0e1a6313d
// next js service worker https://www.npmjs.com/package/next-pwa
// push notification in js https://itnext.io/an-introduction-to-web-push-notifications-a701783917ce

class MyDocument extends NextDocument {
  render() {
    return (
      <Html lang="en" dir="ltr">
        {/* Head needs to be here. Meta Tags are in the Meta Component imported through Page Component */}
        <Head></Head>
        <body>
          <Main />
          <div id="modal" />
          <div id="modal-root" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const { pathname, query, asPath, req, res, err } = ctx;

  // Render app and page and get the context of the page with collected side effects.
  const styledComponentSheet = new StyledComponentSheets();
  const materialUiSheets = new MaterialUiServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props =>
          styledComponentSheet.collectStyles(
            materialUiSheets.collect(<App {...props} />)
          ),
      });
    const initialProps = await NextDocument.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: [
        <React.Fragment key="styles">
          {initialProps.styles}
          {materialUiSheets.getStyleElement()}
          {styledComponentSheet.getStyleElement()}
        </React.Fragment>,
      ],
    };
  } finally {
    styledComponentSheet.seal();
  }
};

export default MyDocument;
