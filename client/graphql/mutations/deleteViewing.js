import gql from 'graphql-tag';

const DELETE_VIEWING = gql`
  mutation DELETE_USER_ACCOUNT($where: ViewingWhereUniqueInput!) {
    deleteViewing(where: $where) {
      id
    }
  }
`;

export { DELETE_VIEWING };
