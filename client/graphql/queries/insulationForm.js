import gql from 'graphql-tag';

import { InsulationFormInfoFragment } from '../fragments';
const INSULATION_FORM_QUERY = gql`
  query INSULATION_FORM_QUERY($where: InsulationFormWhereUniqueInput!) {
    insulationForm(where: $where) {
      ...insulationFormInfo
    }
  }
  ${InsulationFormInfoFragment}
`;

export { INSULATION_FORM_QUERY };
