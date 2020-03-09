import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation, Subscription } from '@apollo/react-components';
import { ApolloProvider, useQuery, useApolloClient } from '@apollo/client';
import Error from '../ErrorMessage/index';
import PropertyCard from '../PropertyCard/index';
import { PROPERTIES_QUERY } from '../../graphql/queries/propertiesQuery';

const PropertiesList = () => {
  const { data, loading, error } = useQuery(PROPERTIES_QUERY);
  if (error) return <Error error={error} />;
  if (loading) return <p>Loading properties list...</p>;
  const { properties } = data;
  return (
    <div
      style={{
        display: 'flex',
        // alignItems: "center",
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
      {properties.map((property, i) => (
        <PropertyCard key={i} property={property} />
      ))}
    </div>
  );
};

// export default class index extends Component {
//   render() {
//     return (
//       <Query query={PROPERTIES_QUERY}>
//         {({ data, loading, error }) => {
//           if (error) return <Error error={error} />;
//           if (loading) return <p>Loading properties list...</p>;
//           const { properties } = data;
//           return (
//             <div
//               style={{
//                 display: 'flex',
//                 // alignItems: "center",
//                 flexWrap: 'wrap',
//                 justifyContent: 'center',
//               }}>
//               {properties.map((property, i) => (
//                 <PropertyCard key={i} property={property} />
//               ))}
//             </div>
//           );
//         }}
//       </Query>
//     );
//   }
// }
