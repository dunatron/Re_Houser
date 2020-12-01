import Head from 'next/head';

import mainPalette from '@/Themes/palettes/mainPalette';

const APP_NAME = 'ReHouser PWA';
const APP_DESCRIPTION =
  'Rehouser official progressive web app to manage your properties, applications and leases from anywhere';

const Meta = () => (
  <Head>
    <title>Re-Houser</title>
    <meta name="application-name" content={APP_NAME} />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content={APP_NAME} />
    <meta name="description" content={APP_DESCRIPTION} />
    <meta name="format-detection" content="telephone=no" />
    <meta name="mobile-web-app-capable" content="yes" />
    {/* <meta name="theme-color" content="#FFFFFF" /> */}
    <meta name="theme-color" content={mainPalette.palette.secondary.main} />
    {/* TIP: set viewport head meta tag in _app.js, otherwise it will show a warning */}
    {/* <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' /> */}

    <link
      rel="apple-touch-icon"
      sizes="192x192"
      href="/icons/icon-192x192.png"
    />
    <link rel="manifest" href="/manifest.json" />
    <link rel="shortcut icon" href="/icons/favicon.ico" />
    {/* Sets the browser color */}

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
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <meta
      name="google-site-verification"
      content="R82iamf9jm4UiOzDtCqePSfeP2wEN2lft1EEKE_cr2o"
      key="google-site-verification"
    />
    {/* <script
      async
      src="https://widget.Cloudinary.com/v2.0/global/all.js"
      type="text/javascript"></script> */}
    <script
      rel="preload"
      src="https://widget.Cloudinary.com/v2.0/global/all.js"
      type="text/javascript"
      as="script"></script>
  </Head>
);

export default Meta;
