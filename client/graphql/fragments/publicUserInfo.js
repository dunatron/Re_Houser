import gql from 'graphql-tag';
import { FileInfoFragment } from './fileInfo';

const PublicUserInfoFragment = gql`
  fragment publicUserInfo on User {
    id
    firstName
    lastName
    phone
    email
    rehouserStamp
    profilePhoto {
      ...fileInfo
    }
    rehouserStamp
  }
  ${FileInfoFragment}
`;

export { PublicUserInfoFragment };

export default PublicUserInfoFragment;
