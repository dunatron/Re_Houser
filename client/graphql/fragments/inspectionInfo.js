import gql from 'graphql-tag';

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
      id
      url
    }
  }
`;

export { InspectionInfoFragment };
export default InspectionInfoFragment;
