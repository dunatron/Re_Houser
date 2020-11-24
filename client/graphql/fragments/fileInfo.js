import gql from 'graphql-tag';

const FileInfoFragment = gql`
  fragment fileInfo on File {
    id
    public_id
    resource_type
    access_mode
    url
    uploaderId
    filename
    mimetype
    encoding
    url
    secure_url
    bytes
    type
    userPhotoId {
      id
    }
    userProfilePhoto {
      id
    }
    userSignature {
      id
    }
    preTenancyProofOfAddress {
      id
    }
    userProofOfAddress {
      id
    }
    propertyOwnershipProof {
      id
    }
    propertyImages {
      id
    }
    propertyInsulationFile {
      id
    }
    inspectionFiles {
      id
    }
    codeComplianceCert {
      id
    }
    certOfAcceptance {
      id
    }
    insurancePolicy {
      id
    }
  }
`;

export { FileInfoFragment };

export default FileInfoFragment;
