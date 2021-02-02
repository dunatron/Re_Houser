import gql from 'graphql-tag';

// id: ID! @unique @id
// user: User @relation(name: "CurrentUserAddress")
// placeId: String!
// desc: String!
// lat: Float!
// lng: Float!
const AddressInfoFragment = gql`
  fragment addressInfo on Address {
    id
    user {
      id
    }
    placeId
    desc
    lat
    lng
  }
`;

export { AddressInfoFragment };
export default AddressInfoFragment;
