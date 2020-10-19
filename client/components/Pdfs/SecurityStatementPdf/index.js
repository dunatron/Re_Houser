import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import {
  PDFDownloadLink,
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer';

import styles from '../styles';
import PageWithFooter from '../PageWithFooter';

// Sections
import Section1 from './Section1'; // header
import Section2 from './Section2'; // objective
import Section3 from './Section3'; // policy
import Section4 from './Section4'; // risks

const SecurityStatementPdf = ({ me, lease }) => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {loading && <Typography gutterBottom>Generating Pdf...</Typography>}
      <PDFViewer width="100%" height={loading ? '0' : '500px'}>
        <SecurityStatementDocument
          onRender={() => {
            setLoading(false);
          }}
        />
      </PDFViewer>
    </>
  );
};

const SecurityStatementDocument = ({ onRender }) => {
  return (
    <Document
      title="Rehouser Security Statement"
      author="Dunatron"
      subject="Rehouser security statement to our users"
      keywords="Security statemenet, security, files, pdf"
      creator="Heath Dunlop"
      producer="Heath McDonough"
      onRender={onRender}>
      <PageWithFooter size="A4" style={styles.page}>
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Image
          style={{
            width: '50%',
            padding: 20,
            border: '1px solid grey',
          }}
          src="/images/signatures/rehouser_admin_signature.png"
        />
      </PageWithFooter>
    </Document>
  );
};

SecurityStatementPdf.propTypes = {
  lease: PropTypes.any,
  me: PropTypes.any,
};

export default SecurityStatementPdf;
