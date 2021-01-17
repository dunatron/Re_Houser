import gql from 'graphql-tag';

const ChargeInfoFragment = gql`
  fragment chargeInfo on Charge {
    id
  }
`;

export { ChargeInfoFragment };
export default ChargeInfoFragment;
