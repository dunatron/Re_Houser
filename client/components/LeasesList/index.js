import React, { Component } from 'react';
import { useQuery } from '@apollo/client';
import { MY_LEASES_QUERY } from '../../graphql/queries/index';
import Error from '../ErrorMessage';
import LeasesTable from './LeasesTable';
import SuperiorTable from '../SuperiorTable';
import Loader from '../Loader/index';

const LeasesList = () => {
  const { data, error, loading } = useQuery(MY_LEASES_QUERY);
  if (error) return <h1>Fuck u</h1>;
  if (error) return <Error error={error} />;
  if (loading) return <Loader loading={loading} text="Loading your leases" />;

  // const columns = [
  //   {
  //     title: "YAYAY",
  //     field: "location",
  //   },
  //   {
  //     title: "YAYAY",
  //     field: "rent",
  //   },
  //   {
  //     title: "YAYAY",
  //     field: "location",
  //   },
  //   {
  //     title: "YAYAY",
  //     field: "location",
  //   },
  // ]

  // return (
  //   <SuperiorTable
  //     data={data.myLeases}
  //     columns={columns}
  //     options={{
  //       search: true,
  //     }}
  //   />
  // )
  return <LeasesTable leases={data.myLeases} />;
};

export default LeasesList;
