import gql from 'graphql-tag';

const CREATE_VIEWING_MUTATION = gql`
  mutation CREATE_VIEWING_MUTATION($data: ViewingCreateInput!) {
    createViewing(data: $data) {
      id
      dateTime
      recurringType
      minutesFor
      hosts {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

export { CREATE_VIEWING_MUTATION };
