// data: UserUpdateInput!
import gql from 'graphql-tag';

const UPDATE_INSULATION_FORM_MUTATION = gql`
  mutation UPDATE_INSULATION_FORM_MUTATION(
    $data: InsulationFormUpdateInput!
    $where: InsulationFormWhereUniqueInput!
  ) {
    updateInsulationForm(data: $data, where: $where) {
      id
      # turnm rental applications into a fragment?...
      # rentalApplications
      # just return all the fields, make it a fragments
    }
  }
`;

export { UPDATE_INSULATION_FORM_MUTATION };
