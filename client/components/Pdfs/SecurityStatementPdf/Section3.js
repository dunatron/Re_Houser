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

const Section3 = () => {
  return (
    <View style={styles.section} wrap={false}>
      <View style={styles.column}>
        <Text style={{ ...styles.h2 }}>Policy</Text>
        <Text style={{ ...styles.body1 }}>
          Our security policies. How we will vow to keep information secure.
          What we use to help keep it secure. Perhaps stating how we keep
          accurate information and they can request for it by emailing
          admin@rehouser.co.nz and they have a right to bla bla
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

export default Section3;
