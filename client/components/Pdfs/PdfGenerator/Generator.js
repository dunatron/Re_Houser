import { useState } from 'react';
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
import { Typography } from '@material-ui/core';
import styles from '../styles';
import PageWithFooter from '../PageWithFooter';
import RenderType from './RenderType';

const PdfGenerator = ({ docConf, config, viewerConf }) => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {loading && <Typography gutterBottom>Generating Pdf...</Typography>}
      <PDFViewer width="100%" height={loading ? '0' : '500px'} {...viewerConf}>
        <GenerateDocument
          docConf={docConf}
          config={config}
          onRender={() => {
            setLoading(false);
          }}
        />
      </PDFViewer>
    </>
  );
};

const GenerateDocument = ({ docConf, config, onRender }) => {
  return (
    <Document
      {...docConf} // e.g. title, author, keywords
      onRender={onRender}>
      <PageWithFooter size="A4" style={styles.page}>
        {config.map((item, idx) => {
          return <RenderType key={idx} item={item} />;
        })}
      </PageWithFooter>
    </Document>
  );
};

export default PdfGenerator;
