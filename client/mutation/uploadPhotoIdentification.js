import gql from "graphql-tag"

const UPLOAD_PHOTO_IDENTIFICATION = gql`
  mutation UPLOAD_PHOTO_IDENTIFICATION($file: Upload!, $photoId: String!) {
    uploadPhotoId(file: $file, photoId: $photoId) {
      identificationNumber
      photoIdentification {
        id
        filename
        url
      }
    }
  }
`

export { UPLOAD_PHOTO_IDENTIFICATION }
