// data: UserUpdateInput!
import gql from 'graphql-tag';

const UPDATE_PROPERTY_MUTATION = gql`
  mutation UPDATE_PROPERTY_MUTATION(
    $data: PropertyUpdateInput!
    $where: PropertyWhereUniqueInput!
  ) {
    updateProperty(data: $data, where: $where) {
      id
      rooms
      rent
      moveInDate
      expiryDate
      onTheMarket
      location
      locationLat
      locationLng
      owners {
        id
        email
        firstName
      }
      images {
        url
      }
      # turnm rental applications into a fragment?...
      # rentalApplications
    }
  }
`;

export { UPDATE_PROPERTY_MUTATION };
