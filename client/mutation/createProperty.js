import gql from 'graphql-tag';

const CREATE_PROPERTY_MUTATION = gql`
  mutation CREATE_PROPERTY_MUTATION(
    $data: PropertyCreateInput!
    $files: [Upload]
  ) {
    createProperty(data: $data, files: $files) {
      id
    }
  }
`;

export { CREATE_PROPERTY_MUTATION };
