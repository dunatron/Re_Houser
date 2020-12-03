import gql from 'graphql-tag';

//should probably move awaitingFriends and friend request from here
const SuccessMessageFragment = gql`
  fragment successMessageInfo on SuccessMessage {
    message
    data
  }
`;

export { SuccessMessageFragment };
export default SuccessMessageFragment;
