import Head from "next/head"

const Meta = () => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="stylesheet" type="text/css" href="../../static/geosuggest.css" />
    <link rel="stylesheet" type="text/css" href="../../static/slick.css" />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"
    />
    {/* <script src="https://js.stripe.com/v3/" /> */}
    <script key="stripe" id="stripe-js" src="https://js.stripe.com/v3/" async />
    <meta
      name="google-site-verification"
      content="R82iamf9jm4UiOzDtCqePSfeP2wEN2lft1EEKE_cr2o"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="../../static/slick-theme.css"
    />
    <link rel="shortcut icon" href="/static/favicon.ico" />
    <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
    <link rel="stylesheet" type="text/css" href="/static/customToast.css" />

    {/* <link
      rel="stylesheet"
      type="text/css"
      charset="UTF-8"
      href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
    /> */}
    <title>Re-Houser</title>
  </Head>
)

export default Meta
