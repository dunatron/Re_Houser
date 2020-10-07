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
      json
    }
    submittedForms {
      id
      createdAt
      json
    }
    files {
      id
      url
    }
  }
`;

export { InspectionInfoFragment };
export default InspectionInfoFragment;
