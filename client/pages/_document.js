import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
// import { ServerStyleSheets } from '@material-ui/styles';
// import theme from '@/Styles/_muiTheme';
import mainPalette from '@/Themes/palettes/mainPalette'; // hmm kinda sdtatic but owel

import { ServerStyleSheet as StyledComponentSheets } from 'styled-components';
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/core/styles';

class MyDocument extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <Head>
          <meta charSet="utf-8" />
          {/* Sets the browser color */}
          <meta
            name="theme-color"
            content={mainPalette.palette.secondary.main}
          />
          {/* preLoad our regular font */}
          <link
            rel="preload"
            href="/fonts/azo-sans/AzoSans-Regular.woff"
            as="font"
            crossOrigin=""
          />
          {/* preLoad our bold font */}
          <link
            rel="preload"
            href="/fonts/azo-sans/AzoSans-Bold.woff"
            as="font"
            crossOrigin=""
          />
          {/* async load stripe js */}
          <script
            key="stripe-js"
            id="stripe-js"
            src="https://js.stripe.com/v3/"
            async
          />
          {/* load in material icons */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
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
