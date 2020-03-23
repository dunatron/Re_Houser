// import gql from 'graphql-tag';
// import { PropertyInfoFragment } from '../fragments/propertyInfo';

// const SINGLE_LEASE_QUERY = gql`
//   query SINGLE_LEASE_QUERY($where: PropertyLeaseWhereUniqueInput!) {
//     myLease(where: $where) {
//       id
//       updatedAt
//       createdAt
//       property {
//         ...propertyInfo
//       }
//       lessees {
//         id
//         signed
//         user {
//           id
//           email
//         }
//       }
//       lessors {
//         id
//         signed
//         user {
//           id
//           email
//         }
//       }
//       finalised
//       rooms
//       bathrooms
//       garageSpaces
//       carportSpaces
//       offStreetSpaces
//       indoorFeatures
//       outdoorFeatures
//       rent
//       moveInDate
//       expiryDate
//       location
//       locationLat
//       locationLng
//     }
//   }
//   ${PropertyInfoFragment}
// `;

// export { SINGLE_LEASE_QUERY };

import gql from 'graphql-tag';
import { PropertyLeaseInfoFragment } from '../fragments/propertyLeaseInfo';

const SINGLE_LEASE_QUERY = gql`
  query SINGLE_LEASE_QUERY($where: PropertyLeaseWhereUniqueInput!) {
    myLease(where: $where) {
      ...propertyLeaseInfo
    }
  }
  ${PropertyLeaseInfoFragment}
`;

export { SINGLE_LEASE_QUERY };
