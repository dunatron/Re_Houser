import gql from 'graphql-tag';

const OWNER_PROPERTIES_QUERY = gql`
  query OWNER_PROPERTIES_QUERY {
    ownerProperties {
      id
      rooms
      rent
      moveInDate
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
    }
  }
`;

export { OWNER_PROPERTIES_QUERY };
