import gql from 'graphql-tag';
import { PaymentInfoFragment } from '../fragments/paymentInfo';

const PAYMENTS_QUERY = gql`
  query PAYMENTS_QUERY(
    $where: PaymentWhereInput
    $orderBy: PaymentOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    payments(
      where: $where
      orderBy: $orderBy
      skip: $skip
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      ...paymentInfo
    }
  }
  ${PaymentInfoFragment}
`;

export { PAYMENTS_QUERY };
