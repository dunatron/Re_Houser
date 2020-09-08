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

import styles from '../styles';
import moment from 'moment';

const Section1 = () => {
  return (
    <View style={styles.section}>
      <View style={styles.column}>
        <Text style={{ ...styles.h1, ...styles.center }}>
          Rehouser Security Statement
        </Text>
        <Text style={{ ...styles.h3, ...styles.center }}>
          {moment().format('Mo MMMM YYYY')}
        </Text>
      </View>
    </View>
  );
};

export default Section1;
