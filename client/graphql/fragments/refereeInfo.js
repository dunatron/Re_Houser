import gql from 'graphql-tag';

const RefereeInfoFragment = gql`
  fragment refereeInfo on Referee {
    id
    name
    email
    phone
    relationship
  }
`;

export { RefereeInfoFragment };
export default RefereeInfoFragment;
