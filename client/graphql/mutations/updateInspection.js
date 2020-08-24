// updateInspection
import gql from 'graphql-tag';
import * as fragments from '../fragments';

const UPDATE_INSPECTION_MUTATION = gql`
  mutation updateInspection(
    $data: InspectionUpdateInput!
    $where: InspectionWhereUniqueInput!
  ) {
    updateInspection(data: $data, where: $where) {
      id
      date
      completed
      notes
      property {
        id
        location
      }
    }
  }
`;

export { UPDATE_INSPECTION_MUTATION };
export default UPDATE_INSPECTION_MUTATION;
