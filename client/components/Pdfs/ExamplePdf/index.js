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

import styles from '../styles';

// Sections
import Section1 from './Section1';

//https://github.com/diegomura/react-pdf/blob/master/examples/pageWrap/index.js
import PageWithFooter from '../PageWithFooter';

const ExamplePdf = ({ me, lease }) => {
  return (
    <div>Sorry Load in With Next js Dynamic or not at al. ExamplePdfl</div>
  );
  return (
    <PDFViewer width="100%" height="500px">
      <Document>
        <PageWithFooter size="A4" style={styles.page}>
          <View style={styles.column}>
            <Text style={styles.h1}>Page 1</Text>
          </View>
          <Section1 />
          <Section1 />
        </PageWithFooter>
        <PageWithFooter size="A4" style={styles.page}>
          <View style={styles.column}>
            <Text style={styles.h1}>Page 2</Text>
          </View>
          <Section1 />
          <Section1 />
          <Section1 />
          <Section1 />
        </PageWithFooter>
      </Document>
    </PDFViewer>
  );
};

ExamplePdf.propTypes = {
  lease: PropTypes.any,
  me: PropTypes.any,
};

export default ExamplePdf;
