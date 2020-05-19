import gql from 'graphql-tag';

const FileInfoFragment = gql`
  fragment fileInfo on File {
    id
    url
    filename
    mimetype
    encoding
    createdAt
    updatedAt
  }
`;

export { FileInfoFragment };
