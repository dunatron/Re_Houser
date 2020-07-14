import gql from 'graphql-tag';
import * as fragments from '../fragments';

const CREATE_VIEWING_MUTATION = gql`
  mutation CREATE_VIEWING_MUTATION($data: ViewingCreateInput!) {
    createViewing(data: $data) {
      ...viewingInfo
    }
  }
  ${fragments.ViewingInfoFragment}
`;

export { CREATE_VIEWING_MUTATION };
