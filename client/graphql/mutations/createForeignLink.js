import * as fragments from '../fragments';
import gql from 'graphql-tag';

const CREATE_FOREIGN_LINK_MUTATION = gql`
  mutation CREATE_FOREIGN_LINK_MUTATION($data: ForeignLinkCreateInput!) {
    createMessage(data: $data) {
      ...foreignLinkInfo
    }
  }
  ${fragments.ForeignLinkInfoFragment}
`;
export { CREATE_FOREIGN_LINK_MUTATION };
