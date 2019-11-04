import gql from 'graphql-tag';

const UPLOAD_PROFILE_PHOTO = gql`
  mutation UPLOAD_PROFILE_PHOTO($file: Upload!) {
    uploadProfilePhoto(file: $file) {
      profilePhoto {
        id
        filename
        url
      }
    }
  }
`;

export { UPLOAD_PROFILE_PHOTO };
