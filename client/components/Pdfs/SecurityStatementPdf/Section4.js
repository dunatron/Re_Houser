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

const Section4 = () => {
  return (
    <View style={styles.section} wrap={false}>
      <View style={styles.column}>
        <Text style={{ ...styles.h2 }}>Risks</Text>
        <Text style={{ ...styles.body1 }}>
          We have defined potential risks in regards to.{' '}
        </Text>
        <View style={{ ...styles.ul }}>
          <Text style={{ ...styles.li, ...styles.body1 }}>1. Item One</Text>
          <View style={{ ...styles.ul }}>
            <Text style={{ ...styles.li, ...styles.body1 }}>a) Item One</Text>
            <Text style={{ ...styles.li, ...styles.body1 }}>b) Item One</Text>
            <Text style={{ ...styles.li, ...styles.body1 }}>c) Item One</Text>
          </View>
          <Text style={{ ...styles.li, ...styles.body1 }}>2. Item One</Text>
          <Text style={{ ...styles.li, ...styles.body1 }}>3. Item One</Text>
        </View>
      </View>
    </View>
  );
};

export default Section4;
