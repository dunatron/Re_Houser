import gql from 'graphql-tag';

const getMutation = (type, key) => {
  switch (type) {
    case 'Property':
      return gql`
      mutation EDITABLE_DISPLAY_MUTATION($data: PropertyUpdateInput!, $where: PropertyWhereUniqueInput!) {
        updateProperty(data: $data, where: $where) {
          id
          ${key}
        }
      }
    `;
    case 'PropertyLease':
      return gql`
      mutation EDITABLE_DISPLAY_MUTATION($data: PropertyLeaseUpdateInput!, $where: PropertyLeaseWhereUniqueInput!) {
        updatePropertyLease(data: $data, where: $where) {
          id
          ${key}
        }
      }
    `;
    default:
      return '';
  }
};

export default getMutation;
