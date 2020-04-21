import gql from 'graphql-tag';

const UPLOAD_SIGNATURE_FILE = gql`
  mutation UPLOAD_SIGNATURE_FILE($file: Upload!) {
    uploadSignature(file: $file) {
      signature {
        id
        filename
        url
      }
    }
  }
`;

export { UPLOAD_SIGNATURE_FILE };
