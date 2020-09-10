import PropTypes from "prop-types";
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

import styles from './styles';

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
    <Page size="A4" style={styles.page} ruler={false}>
      {props.children}
      <PdfFooter />
    </Page>
  );
};

PageWithFooter.propTypes = {
  children: PropTypes.any.isRequired
}

export default PageWithFooter;
