import React, { Component } from 'react';
import { useQuery } from '@apollo/client';
import { MY_LEASES_QUERY } from '../../graphql/queries/index';
import Error from '../ErrorMessage';
import Loader from '../Loader/index';
import LeasesTable from '../Tables/LeasesTable';

const LeasesList = () => {
  const { data, error, loading } = useQuery(MY_LEASES_QUERY);
  if (error) return <Error error={error} />;
  if (loading) return <Loader loading={loading} text="Loading your leases" />;
  return <LeasesTable leases={data.myLeases} />;
};

export default LeasesList;
