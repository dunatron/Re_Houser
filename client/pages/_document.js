import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import mainPalette from '@/Themes/palettes/mainPalette';

import { ServerStyleSheet as StyledComponentSheets } from 'styled-components';
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/core/styles';

// service worker https://itnext.io/pwa-with-next-js-create-next-app-in-2020-%EF%B8%8F-9ee0e1a6313d
class MyDocument extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <Head>
          <meta name="application-name" content="PWA App" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="PWA App" />
          <meta name="description" content="Best PWA App in the world" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-config"
            content="/icons/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="mask-icon"
            href="/icons/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <link rel="shortcut icon" href="/icons/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://yourdomain.com" />
          <meta name="twitter:title" content="PWA App" />
          <meta
            name="twitter:description"
            content="Best PWA App in the world"
          />
          <meta
            name="twitter:image"
            content="https://yourdomain.com/static/icons/android-chrome-192x192.png"
          />
          <meta name="twitter:creator" content="@Dunatron" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="RehouserPWA App" />
          <meta property="og:description" content="Rehouser PWA" />
          <meta property="og:site_name" content="Rehouser PWA App" />
          <meta property="og:url" content="https://app.rehouser.co.nz" />
          <meta
            property="og:image"
            content="https://app.rehouser.co.nz/icons/apple-touch-icon.png"
          />

          <meta charSet="utf-8" />
          {/* Sets the browser color */}
          <meta
            name="theme-color"
            content={mainPalette.palette.secondary.main}
          />
          {/* load in google roboto font */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          {/* load in material icons */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
          {/* async load stripe js */}
          <script
            key="stripe-js"
            id="stripe-js"
            src="https://js.stripe.com/v3/"
            async
          />
        </Head>
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
