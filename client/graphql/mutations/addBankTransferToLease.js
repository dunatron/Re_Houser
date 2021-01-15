import gql from 'graphql-tag';
import * as fragments from '../fragments';

const ADD_BANK_TRANSFER_TO_LEASE_MUTATION = gql`
  mutation applyToRentalGroup($bankRef: String!, $data: PaymentCreateInput!) {
    addBankTransferToLease(bankRef: $bankRef, data: $data) {
      ...propertyLeaseInfo
    }
  }
  ${fragments.PropertyLeaseInfoFragment}
`;

export { ADD_BANK_TRANSFER_TO_LEASE_MUTATION };
