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

          {/* PWA primary color */}
          {/* <meta name="theme-color" content={theme.palette.primary.main} /> */}
          <meta
            name="theme-color"
            content={mainPalette.palette.secondary.main}
          />

          <link
            rel="preload"
            href="/static/fonts/azo-sans/AzoSans-Regular.woff"
            as="font"
            crossOrigin=""
          />

          <link
            rel="preload"
            href="/static/fonts/azo-sans/AzoSans-Bold.woff"
            as="font"
            crossOrigin=""
          />

          {/* <Link
            rel="preload"
            href="/static/rehouser-trial-fonts.css"
            as="font"
            crossOrigin=""
          /> */}

          {/* <link
            rel="stylesheet"
            type="text/css"
            href="/static/rehouser-fonts.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/rehouser-trial-fonts.css"
          /> */}
          {/* <link
            rel="stylesheet"
            type="text/css"
            href="/static/customToast.css"
          /> */}

          {/* <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          /> */}
          <script
            key="stripe-js"
            id="stripe-js"
            src="https://js.stripe.com/v3/"
            async
          />
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

  // // Render app and page and get the context of the page with collected side effects.
  // const sheets = new ServerStyleSheets();
  // const originalRenderPage = ctx.renderPage;

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
