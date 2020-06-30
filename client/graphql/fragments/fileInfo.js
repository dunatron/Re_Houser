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
    asset_id
    public_id
    version
    version_id
    signature
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

// asset_id: String
// public_id: String
// version: Int
// version_id: String
// signature: String
// width: Int
// height: Int
// format: String
// resource_type: String
// created_at: DateTime
// tags: Json
// pages: Int
// bytes: Int
// type: String
// etag: String
// placeholder: Boolean
// url: String
// secure_url: String
// access_mode: String
// original_filename: String

// userPhotoId: User
// userProfilePhoto: User
// userSignature: User
// preTenancyProofOfAddress: PreTenancyForm
// userProofOfAddress: User
