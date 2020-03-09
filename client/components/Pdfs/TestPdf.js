import React from 'react';
import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const MyDocument = ({ me }) => {
  if (!me) return null;
  //   const profileImageBase64 = toDataURL(
  //     'https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0'
  //   ).then(dataUrl => {
  //     console.log('RESULT:', dataUrl);
  //     return dataUrl;
  //   });
  return (
    <PDFViewer width="100%" height="500px">
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>FirstName</Text>
            <Text>{me.firstName}</Text>
          </View>
          <View style={styles.section}>
            <Text>Email</Text>
            <Text>{me.email}</Text>
          </View>
          <Text
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
        <Page>
          {me.profilePhoto && (
            <Image
              src={{
                uri: me.profilePhoto.url,
                method: 'GET',
              }}
            />
          )}

          <Text
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default MyDocument;
