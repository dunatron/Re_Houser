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
  const todaysDate = moment().format('Do MMMM YYYY');

  return (
    <View style={styles.section} wrap={false}>
      <View style={styles.column}>
        <Text style={{ ...styles.h1, ...styles.center }}>
          Rehouser Security Statement
        </Text>
        <Text style={{ ...styles.h3, ...styles.center }}>{todaysDate}</Text>
      </View>
    </View>
  );
};

export default Section1;
