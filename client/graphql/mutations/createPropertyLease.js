import gql from 'graphql-tag';

const CREATE_PROPERTY_LEASE_MUTATION = gql`
  mutation CREATE_PROPERTY_LEASE_MUTATION($data: PropertyLeaseCreateInput!) {
    createPropertyLease(data: $data) {
      id
      indoorFeatures
      location
    }
  }
`;

export { CREATE_PROPERTY_LEASE_MUTATION };
