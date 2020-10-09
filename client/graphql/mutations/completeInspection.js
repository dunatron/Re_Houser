import gql from 'graphql-tag';
import * as fragments from '../fragments';

const COMPLETE_INSPECTION_MUTATION = gql`
  mutation completeInspection(
    $data: InspectionUpdateInput!
    $where: InspectionWhereUniqueInput!
  ) {
    completeInspection(data: $data, where: $where) {
      ...inspectionInfo
    }
  }
  ${fragments.InspectionInfoFragment}
`;

export { COMPLETE_INSPECTION_MUTATION };
export default COMPLETE_INSPECTION_MUTATION;
