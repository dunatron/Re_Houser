import gql from 'graphql-tag';
import { InspectionInfoFragment } from '../fragments';

const SINGLE_INSPECTION_QUERY = gql`
  query SINGLE_INSPECTION_QUERY($where: InspectionWhereUniqueInput!) {
    inspection(where: $where) {
      ...inspectionInfo
    }
  }
  ${InspectionInfoFragment}
`;

export { SINGLE_INSPECTION_QUERY };
