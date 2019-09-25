import gql from 'graphql-tag';
/**
 * Not working.. maybe because we are spreading on an array
 */
const CreditCardInfoFragment = gql`
  fragment creditCardInfo on CreditCard {
    id
    stripeCardId
    stripeCustomerId
    brand
    funding
    country
    address_city
    address_country
    address_line1
    address_line1_check
    address_line2
    address_state
    address_zip
    address_zip_check
    exp_month
    exp_year
    fingerprint
    last4
    name
    object
    cvc_check
  }
`;

export { CreditCardInfoFragment };
