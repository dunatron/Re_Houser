import gql from 'graphql-tag';
import * as fragments from '../fragments';
// DOESNT WORK!!!
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
    updatedAt
    createdAt
    property {
      id
    }
    lease {
      id
    }
    inspector {
      id
      firstName
    }
    date
    completedTime
    completed
    notes
    inspectionForm {
      id
      createdAt
      completedAt
      json
      vals
    }
    submittedForms {
      id
      createdAt
      completedAt
      json
      vals
    }
    files {
      id
      url
    }
      }
    }
  }
`;

export { INSPECTION_SUBSCRIPTION };
export default INSPECTION_SUBSCRIPTION