import gql from 'graphql-tag';
/**
 * Not working.. maybe because we are spreading on an array
 */
const PaymentInfoFragment = gql`
  fragment paymentInfo on Payment {
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
    isLeased
  }
`;

export { PaymentInfoFragment };
