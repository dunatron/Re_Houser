import gql from 'graphql-tag';

const BankDetailInfoFragment = gql`
  fragment bankDetailInfo on BankDetail {
    id
    user {
      id
    }
    property {
      id
    }
    name
    bankNumber
    branchNumber
    accountNumber
    suffix
  }
`;

export { BankDetailInfoFragment };
export default BankDetailInfoFragment;
