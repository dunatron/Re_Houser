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
  family: 'AzoSansRegular',
  src: `${__dirname}../../fonts/azo-sans/AzoSans-Regular.woff`,
});
Font.register({
  family: 'AzoSansBold',
  src: `${__dirname}../../fonts/azo-sans/AzoSans-Bold.woff`,
});

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    fontFamily: 'AzoSansRegular',
    color: '#30302f',
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
    fontSize: '22pt',
    fontFamily: 'AzoSansBold',
    marginBottom: '22pt',
  },
  h2: {
    fontSize: '20pt',
    fontFamily: 'AzoSansBold',
    marginBottom: '20pt',
  },
  h3: {
    fontSize: '18pt',
    fontFamily: 'AzoSansBold',
    marginBottom: '18pt',
  },
  body1: {
    fontSize: '13pt',
    fontFamily: 'AzoSansRegular',
    marginBottom: '13pt',
  },
  body2: {
    fontSize: '11pt',
    fontFamily: 'AzoSansRegular',
    marginBottom: '11pt',
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
