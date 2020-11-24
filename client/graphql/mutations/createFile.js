import * as fragments from '../fragments';
import gql from 'graphql-tag';

const CREATE_FILE_MUTATION = gql`
  mutation CREATE_FILE_MUTATION($data: FileCreateInput!) {
    createFile(data: $data) {
      ...fileInfo
    }
  }
  ${fragments.FileInfoFragment}
`;
export { CREATE_FILE_MUTATION };
