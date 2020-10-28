import gql from 'graphql-tag';

const FileInfoFragment = gql`
  fragment fileInfo on File {
    id
    url
    uploaderId
    filename
    mimetype
    encoding
    url
    secure_url
    access_mode
  }
`;

export { FileInfoFragment };

export default FileInfoFragment;
