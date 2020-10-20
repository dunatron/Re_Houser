import PropTypes from 'prop-types';
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
import moment from 'moment';
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

// Create styles
const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  section: {
    display: 'flex',
    margin: 10,
    padding: 10,
    flexGrow: 1,
    flexWrap: 'wrap',
  },
  row: {
    display: 'flex',
    flexBasis: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  text: {
    color: '#000',
    border: '2px',
    borderColor: 'red',
    fontSize: '12pt',
    margin: '8px 0',
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

const PdfFooter = () => {
  return (
    <Text
      style={styles.footer}
      render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
      fixed
    />
  );
};

const PageWithFooter = props => {
  return (
    <Page size="A4" style={styles.page}>
      {props.children}
      <PdfFooter />
    </Page>
  );
};

PageWithFooter.propTypes = {
  children: PropTypes.any,
};

const LeasePdf = ({ me, lease }) => {
  if (!me) return null;
  const { property } = lease;
  return (
    <PDFViewer width="100%" height="500px">
      <Document>
        <PageWithFooter size="A4" style={styles.page}>
          {/* Property Lease Title */}
          <Text style={styles.text}>Lease for {property.location}</Text>
          <Text style={styles.text}>Total Rent {property.rent}</Text>

          <View style={styles.row}>
            <Text style={styles.text}>Property Type {property.type}</Text>
            <Text style={styles.text}>
              Move in date{' '}
              {moment(property.moveInDate).format(
                'dddd, MMMM Do YYYY, h:mm:ss a'
              )}
            </Text>
          </View>
        </PageWithFooter>
      </Document>
    </PDFViewer>
  );
};

LeasePdf.propTypes = {
  lease: PropTypes.any,
  me: PropTypes.any,
};

export default LeasePdf;
