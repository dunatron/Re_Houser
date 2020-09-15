import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation, Subscription } from '@apollo/react-components';
import { ApolloProvider, useQuery, useApolloClient } from '@apollo/client';
import Error from '@/Components/ErrorMessage/index';
import Loader from '@/Components/Loader';
import PropertyCard from '@/Components/PropertyCard/index';
import { PROPERTIES_QUERY } from '@/Gql/queries/propertiesQuery';

const PropertiesList = () => {
  const { data, loading, error } = useQuery(PROPERTIES_QUERY);
  if (error) return <Error error={error} />;
  if (loading) return <Loader loading={loading} text="Loading properties" />;
  const { properties } = data;
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
      {properties.map((property, i) => (
        <PropertyCard key={i} property={property} />
      ))}
    </div>
  );
};
