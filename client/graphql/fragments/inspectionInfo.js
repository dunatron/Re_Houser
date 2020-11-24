import gql from 'graphql-tag';
import { FileInfoFragment } from './fileInfo';

const InspectionInfoFragment = gql`
  fragment inspectionInfo on Inspection {
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
      ...fileInfo
    }
  }
  ${FileInfoFragment}
`;

export { InspectionInfoFragment };
export default InspectionInfoFragment;
