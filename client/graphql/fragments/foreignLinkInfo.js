import gql from 'graphql-tag';
const ForeignLinkInfoFragment = gql`
  fragment foreignLinkInfo on ForeignLink {
    id
    user {
      id
    }
    property {
      id
    }
    name
    id
    url
    notes
  }
`;

export { ForeignLinkInfoFragment };
export default ForeignLinkInfoFragment;
