import gql from 'graphql-tag';

const CREATE_PROPERTY_MUTATION = gql`
  mutation CREATE_PROPERTY_MUTATION($data: PropertyCreateInput!) {
    createProperty(data: $data) {
      id
      files {
        id
      }
    }
  }
`;

export { CREATE_PROPERTY_MUTATION };
