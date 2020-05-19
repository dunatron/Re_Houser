import gql from 'graphql-tag';

const MY_RENTAL_APPLICATIONS_QUERY = gql`
  query MY_RENTAL_APPLICATIONS_QUERY {
    myRentalApplications {
      id
      owner {
        id
        firstName
      }
      stage
      property {
        id
        location
        rent
        rooms
      }
      applicants {
        id
        completed
        approved
        preTenancyApplicationForm {
          id
        }
      }
    }
  }
`;

export { MY_RENTAL_APPLICATIONS_QUERY };
