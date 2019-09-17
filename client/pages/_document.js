import Document, { Head, Main, NextScript } from "next/document"
import { ServerStyleSheet } from "styled-components"

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <html>
        <Head>
          {this.props.styleTags}
          {/* loading Stripe here because we check it in Component/Page before it is loaded by Component/Meta */}
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
          <NextScript />
        </body>
      </html>
    )
  }
}
