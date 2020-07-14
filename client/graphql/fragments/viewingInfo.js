import gql from 'graphql-tag';

const ViewingInfoFragment = gql`
  fragment viewingInfo on Viewing {
    id
    updatedAt
    createdAt
    dateTime
    minutesFor
    onRequest
    recurringType
    notes
    hosts {
      id
      email
      firstName
      lastName
    }
    property {
      id
      location
    }
  }
`;

export { ViewingInfoFragment };
export default ViewingInfoFragment;
