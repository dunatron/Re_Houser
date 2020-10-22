import gql from 'graphql-tag';
import { UserInfoFragment } from '../fragments/userInfo';

const SINGLE_USER_QUERY = gql`
  query CURRENT_USER_QUERY($where: UserWhereUniqueInput!) {
    user(where: $where) {
      ...userInfo
    }
  }
  ${UserInfoFragment}
`;

// const SINGLE_INSPECTION_QUERY = gql`
//   query SINGLE_INSPECTION_QUERY($where: InspectionWhereUniqueInput!) {
//     inspection(where: $where) {
//       ...inspectionInfo
//     }
//   }
//   ${InspectionInfoFragment}
// `;
export { SINGLE_USER_QUERY };
export default SINGLE_USER_QUERY;
