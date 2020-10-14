import gql from 'graphql-tag';
import * as fragments from '../fragments';

// const INSPECTION_SUBSCRIPTION = gql`
//   subscription($where: InspectionSubscriptionWhereInput) {
//     inspectionSub(where: $where) {
//       mutation
//       previousValues {
//         id
//       }
//       updatedFields
//       node {
//         ...inspectionInfo
//       }
//     }
//   }
//   ${fragments.InspectionInfoFragment}
// `;

const INSPECTION_SUBSCRIPTION = gql`
  subscription($where: InspectionSubscriptionWhereInput) {
    inspectionSub(where: $where) {
      mutation
      previousValues {
        id
      }
      updatedFields
      node {
        id
      }
    }
  }
`;


export { INSPECTION_SUBSCRIPTION };
export default INSPECTION_SUBSCRIPTION