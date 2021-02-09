// updateInspection
import gql from 'graphql-tag';
import { ForeignLinkInfoFragment } from '../fragments/foreignLinkInfo';

const UPDATE_FOREIGN_LINK_MUTATION = gql`
  mutation updateForeignLink(
    $data: ForeignLinkUpdateInput!
    $where: ForeignLinkWhereUniqueInput!
  ) {
    updateForeignLink(data: $data, where: $where) {
      ...foreignLinkInfo
    }
  }
  ${ForeignLinkInfoFragment}
`;

export { UPDATE_FOREIGN_LINK_MUTATION };
export default UPDATE_FOREIGN_LINK_MUTATION;
