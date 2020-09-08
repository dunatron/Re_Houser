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

Font.register({
  family: 'GustanLight',
  //   src: `${__dirname}/fonts/Roboto-Regular.ttf`,
  src: `${__dirname}../../static/fonts/Gustan-Light.woff`,
});
Font.register({
  family: 'GustanMedium',
  //   src: `${__dirname}/fonts/Roboto-Regular.ttf`,
  src: `${__dirname}../../static/fonts/Gustan-Medium.woff`,
});

Font.register({
  family: 'GustanBold',
  //   src: `${__dirname}/fonts/Roboto-Regular.ttf`,
  src: `${__dirname}../../static/fonts/Gustan-Bold.woff`,
});

Font.register({
  family: 'GustanExtraBlack',
  //   src: `${__dirname}/fonts/Roboto-Regular.ttf`,
  src: `${__dirname}../../static/fonts/Gustan-Extrablack.woff`,
});

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  section: {
    display: 'flex',
    margin: 10,
    marginBottom: 0,
    padding: 10,
    paddingBottom: 0,

    // flexGrow: 1,
    flexWrap: 'wrap',
    // border: '2pt solid grey',
  },
  row: {
    display: 'flex',
    flexBasis: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    // border: '1pt solid grey',
    borderColor: 'red',
  },
  ul: {
    paddingLeft: '12pt',
    display: 'flex',
    flexDirection: 'column',
  },
  column: {
    display: 'flex',
    flexBasis: '100%',
    flexWrap: 'wrap',
    flexDirection: 'column',
    // border: '1pt solid grey',
  },
  center: {
    textAlign: 'center',
  },
  h1: {
    fontSize: '18pt',
    fontFamily: 'GustanExtraBlack',
    marginBottom: '4pt',
  },
  h2: {
    fontSize: '16pt',
    fontFamily: 'GustanBold',
    marginBottom: '4pt',
  },
  h3: {
    fontSize: '14pt',
    fontFamily: 'GustanMedium',
    marginBottom: '4pt',
  },
  body1: {
    fontSize: '11pt',
    fontFamily: 'GustanLight',
    marginBottom: '4pt',
  },
  footer: {
    position: 'absolute',
    fontSize: 12,
    bottom: 25,
    left: 35,
    right: 0,
    textAlign: 'center',
    color: 'grey',
    fontFamily: 'GustanLight',
  },
});

export default styles;
