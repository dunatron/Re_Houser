import gql from 'graphql-tag';
/**
 * Not working.. maybe because we are spreading on an array
 */
const PaymentInfoFragment = gql`
  fragment paymentInfo on Payment {
    id
  }
`;

export { PaymentInfoFragment };
