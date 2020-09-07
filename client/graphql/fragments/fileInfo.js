import gql from 'graphql-tag';

const FileInfoFragment = gql`
  fragment fileInfo on File {
    id
    url
    uploaderId
    filename
    mimetype
    encoding
    createdAt
    updatedAt
    asset_id
    public_id
    signature
    version
    version_id
    width
    height
    format
    resource_type
    created_at
    tags
    pages
    bytes
    type
    etag
    placeholder
    url
    secure_url
    access_mode
    original_filename
  }
`;

export { FileInfoFragment };

export default FileInfoFragment;
