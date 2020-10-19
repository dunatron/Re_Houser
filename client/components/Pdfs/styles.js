import React from 'react';
import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer';
//https://github.com/diegomura/react-pdf/blob/master/examples/pageWrap/index.js

// Font.register({
//   family: 'GustanLight',
//   //   src: `${__dirname}/fonts/Roboto-Regular.ttf`,
//   src: `${__dirname}../../static/fonts/Gustan-Light.woff`,
// });
// Font.register({
//   family: 'GustanMedium',
//   //   src: `${__dirname}/fonts/Roboto-Regular.ttf`,
//   src: `${__dirname}../../static/fonts/Gustan-Medium.woff`,
// });

// Font.register({
//   family: 'GustanBold',
//   //   src: `${__dirname}/fonts/Roboto-Regular.ttf`,
//   src: `${__dirname}../../static/fonts/Gustan-Bold.woff`,
// });

// Font.register({
//   family: 'GustanExtraBlack',
//   //   src: `${__dirname}/fonts/Roboto-Regular.ttf`,
//   src: `${__dirname}../../static/fonts/Gustan-Extrablack.woff`,
// });

Font.register({
  family: 'AzoSansRegular',
  src: `${__dirname}../../static/fonts/azo-sans/AzoSans-Regular.woff`,
});
Font.register({
  family: 'AzoSansBold',
  src: `${__dirname}../../static/fonts/azo-sans/AzoSans-Bold.woff`,
});

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    fontFamily: 'AzoSansRegular',
    color: 'grey',
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 16,
  },
  section: {
    display: 'flex',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  row: {
    display: 'flex',
    flexBasis: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    borderColor: 'red',
  },
  ul: {
    paddingLeft: '12pt',
    display: 'flex',
    flexDirection: 'column',
  },

  li_wrapper: {
    position: 'relative',
  },

  li_bullet: {
    position: 'absolute',
    top: '6pt',
    height: '6pt',
    width: '6pt',
    borderRadius: '6pt',
    backgroundColor: 'grey',
  },
  li_number: {
    position: 'absolute',
    fontSize: '13pt',
    fontFamily: 'AzoSansBold',
  },
  li_title: {
    fontFamily: 'AzoSansBold',
    fontSize: '13pt',
    fontWeight: 900,
    paddingLeft: '16pt',
    marginLeft: '8pt',
  },
  li: {
    position: 'relative',
    paddingLeft: '16pt',
    marginLeft: '8pt',
  },
  column: {
    display: 'flex',
    flexBasis: '100%',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  center: {
    textAlign: 'center',
  },
  h1: {
    fontSize: '18pt',
    fontFamily: 'AzoSansBold',
    marginBottom: '18pt',
  },
  h2: {
    fontSize: '16pt',
    fontFamily: 'AzoSansBold',
    marginBottom: '16pt',
  },
  h3: {
    fontSize: '14pt',
    fontFamily: 'AzoSansBold',
    marginBottom: '14pt',
  },
  body1: {
    fontSize: '13pt',
    fontFamily: 'AzoSansRegular',
    marginBottom: '13pt',
  },
  footer: {
    position: 'absolute',
    fontSize: 12,
    bottom: 25,
    left: 35,
    right: 0,
    textAlign: 'center',
    color: 'grey',
    fontFamily: 'AzoSansRegular',
  },
});

export default styles;
