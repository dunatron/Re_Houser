import gql from 'graphql-tag';

const GET_ENUM_QUERY = gql`
  query GET_ENUM_QUERY($name: String!) {
    __type(name: $name) {
      enumValues {
        name
        description
      }
    }
  }
`;
export { GET_ENUM_QUERY };
