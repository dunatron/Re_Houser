import Head from 'next/head';

const APP_NAME = 'ReHouser Property Management Web App';
const APP_DESCRIPTION =
  'Rehouser property management app allows you to look for rental properties on our platform. You can also signup and manage the rental property lease with this app';

const Meta = () => (
  <Head>
    <title>Re-Houser</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <meta
      name="google-site-verification"
      content="R82iamf9jm4UiOzDtCqePSfeP2wEN2lft1EEKE_cr2o"
      key="google-site-verification"
    />
    <meta name="application-name" content={APP_NAME} />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content={APP_NAME} />
    <meta name="description" content={APP_DESCRIPTION} />
    <meta name="format-detection" content="telephone=no" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="theme-color" content="#FFFFFF" />
    {/* TIP: set viewport head meta tag in _app.js, otherwise it will show a warning */}
    {/* <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' /> */}
    <link
      rel="apple-touch-icon"
      sizes="192x192"
      href="/icons/icon-192x192.png"
    />
    <link rel="manifest" href="/manifest.json" />
    <link rel="shortcut icon" href="/icons/favicon.ico" />

    {/* load in google roboto font */}
    <link
      key="material-font-stylesheet"
      rel="stylesheet"
      crossOrigin="anonymous"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
    {/* load in material icons */}
    <link
      key="material-icons-stylesheet"
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
    {/* async load stripe js */}
    <script
      key="stripe-js"
      id="stripe-js"
      src="https://js.stripe.com/v3/"
      as="script"
      defer
    />
    <script
      rel="preconnect"
      key="cloudinary-widget-js"
      src="https://widget.Cloudinary.com/v2.0/global/all.js"
      type="text/javascript"
      defer
    />
  </Head>
);

export default Meta;
