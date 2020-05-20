import gql from 'graphql-tag';

const AccommodationInfoFragment = gql`
  fragment accommodationInfo on Accommodation {
    id
    rent
    roomSize
    description
    expenses
  }
`;

export { AccommodationInfoFragment };
export default AccommodationInfoFragment;
