import PropTypes from "prop-types";
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

import PageWithFooter from '../PageWithFooter';

// Sections
import Section1 from './Section1'; // header
import Section2 from './Section2'; // objective
import Section3 from './Section3'; // policy
import Section4 from './Section4'; // risks

const ExamplePdf = ({ me, lease }) => {
  return (
    <PDFViewer width="100%" height="500px">
      <Document>
        <PageWithFooter size="A4" style={styles.page}>
          <Section1 />
          <Section2 />
          <Section3 />
          <Section4 />
          <Image
            src="/static/images/signatures/rehouser_admin_signature.png"
            // src={{
            //   uri: '/static/images/signatures/rehouser_admin_signature.png',
            //   method: 'GET',
            // }}
          />
        </PageWithFooter>
      </Document>
    </PDFViewer>
  );
};

ExamplePdf.propTypes = {
  lease: PropTypes.any.isRequired,
  me: PropTypes.any.isRequired
}

export default ExamplePdf;
