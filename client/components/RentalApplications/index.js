import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { MY_RENTAL_APPLICATIONS_QUERY } from '@/Gql/queries/index';
import Error from '@/Components/ErrorMessage/index';
import Loader from '@/Components/Loader/index';
import RentalApplicationsTable from './RentalApplicationsTable';

const RentalApplications = props => {
  const { me } = props;
  const { loading, error, data } = useQuery(MY_RENTAL_APPLICATIONS_QUERY);

  if (loading)
    return <Loader loading={loading} text="Loading your applications" />;
  if (error) return <Error error={error} />;
  if (!me) return <h1>No User</h1>;
  const { myRentalApplications } = data;
  return (
    <RentalApplicationsTable
      myRentalApplications={myRentalApplications}
      me={me}
    />
  );
};

RentalApplications.propTypes = {
  me: PropTypes.any.isRequired,
};

export default RentalApplications;
