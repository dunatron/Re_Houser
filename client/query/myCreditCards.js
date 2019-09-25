import gql from 'graphql-tag';
import { CreditCardInfoFragment } from '../fragments/creditCardInfo';

const MY_CREDIT_CARDS_QUERY = gql`
  query MY_CREDIT_CARDS_QUERY($where: CreditCardWhereInput!) {
    myCreditCards(where: $where) {
      ...creditCardInfo
    }
  }
  ${CreditCardInfoFragment}
`;
export { MY_CREDIT_CARDS_QUERY };
