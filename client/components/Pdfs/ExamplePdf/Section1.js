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

const Section1 = () => {
  return (
    <View style={styles.section}>
      <View style={styles.column}>
        <Text style={styles.h1}>Section 1</Text>
        <Text style={styles.body1}>
          Cras eget ligula in mi pretium pretium. Orci varius natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Vivamus
          mollis et nisi sed gravida. Proin eget turpis consequat, pretium eros
          et, interdum nibh. Suspendisse ornare fringilla elit, non eleifend
          mauris. Donec hendrerit sapien a ligula dictum, ut scelerisque erat
          varius. Quisque lacinia sodales turpis, feugiat imperdiet enim
          ullamcorper sit amet. Curabitur vel fringilla ante. Sed rhoncus eu
          libero vel dapibus. Ut quis ex in nibh sodales pulvinar. Integer id
          tincidunt odio. Nulla ut tempus diam. Fusce sem dolor, tincidunt quis
          augue sed, ornare imperdiet purus. Phasellus et arcu nulla. Morbi
          luctus purus eleifend justo sagittis, sit amet mollis mi porta.
        </Text>
        <Text style={styles.h3}>h3. A sub heading</Text>
        <Text style={styles.body1}>
          Nam ultricies lectus quis ante sodales pretium. Sed convallis
          elementum scelerisque. Suspendisse lacinia justo quam, eu molestie
          nulla laoreet in. Vivamus quis nulla gravida, scelerisque lacus id,
          imperdiet turpis. Suspendisse sagittis, nibh non posuere viverra,
          nulla ex aliquam ante, vel fringilla nibh tortor sit amet purus. Orci
          varius natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus mus. Sed neque odio, vehicula eu sollicitudin et, viverra
          vitae mauris. Sed felis nunc, auctor sed lacus non, rhoncus cursus
          sapien. Etiam metus purus, semper in dolor eu, tristique tincidunt
          est. Aliquam vulputate gravida arcu, at tempor eros dignissim in.
          Vivamus ullamcorper suscipit rhoncus.
        </Text>
        <Text style={styles.body1}>
          Duis auctor vitae nulla a elementum. Cras lorem metus, ultricies vel
          mi eget, tincidunt gravida odio. Cras sit amet volutpat velit. Nullam
          finibus sem eu lacus vulputate, a scelerisque risus iaculis. Proin
          sodales commodo nibh, ut semper eros cursus id. Nulla justo augue,
          finibus viverra purus quis, lacinia dignissim magna.
        </Text>
        <Text style={styles.body1}>
          Sed tristique ipsum leo. Phasellus aliquam aliquam libero, eu lacinia
          metus lacinia nec. Proin id magna quis lectus cursus scelerisque.
          Quisque ex quam, feugiat sed risus a, sollicitudin pellentesque magna.
          Sed pellentesque nulla at libero commodo aliquam. Duis id fermentum
          enim. Mauris finibus consectetur arcu, ac tristique nibh consectetur
          in. Nullam eu pulvinar ligula. Suspendisse potenti. In non elit
          blandit odio cursus porttitor. Donec a varius mi, vel fermentum mi.
        </Text>
      </View>
    </View>
  );
};

export default Section1;
