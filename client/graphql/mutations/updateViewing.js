import gql from 'graphql-tag';
import * as fragments from '../fragments';

const UPDATE_VIEWING_MUTATION = gql`
  mutation updateViewing(
    $data: ViewingUpdateInput!
    $where: ViewingWhereUniqueInput!
  ) {
    updateViewing(data: $data, where: $where) {
      ...viewingInfo
    }
  }
  ${fragments.ViewingInfoFragment}
`;

export { UPDATE_VIEWING_MUTATION };
export default UPDATE_VIEWING_MUTATION;
