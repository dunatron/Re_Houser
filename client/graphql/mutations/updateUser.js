import gql from 'graphql-tag';
import * as fragments from '../fragments';

const UPDATE_USER_MUTATION = gql`
  mutation updateUser($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
    updateUser(data: $data, where: $where) {
      ...userInfo
    }
  }
  ${fragments.UserInfoFragment}
`;

export { UPDATE_USER_MUTATION };

// import gql from 'graphql-tag';

// const UPDATE_USER_MUTATION = gql`
//   mutation updateUser($data: UserUpdateInput!, $photoFile: Upload) {
//     updateUser(data: $data, photoFile: $photoFile) {
//       id
//       email
//     }
//   }
// `;

// export { UPDATE_USER_MUTATION };
