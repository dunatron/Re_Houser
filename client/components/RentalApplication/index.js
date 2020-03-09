import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { SINGLE_RENTAL_APPLICATION_QUERY } from '../../graphql/queries';
import Error from '../ErrorMessage';
import { Paper, Typography } from '@material-ui/core';
import OwnerView from './views/OwnerView';
import ApplicantView from './views/ApplicantView';
/**
 * page is wrapped in a must be loggedIn
 */
const RentalApplication = ({ id, me }) => {
  console.log('I believe we change the dam data and it refreshes from up here');
  console.log('rental application Id', id);
  console.log('rental application Id', me);
  const { data, loading, error } = useQuery(SINGLE_RENTAL_APPLICATION_QUERY, {
    variables: {
      where: {
        id: id,
      },
    },
  });
  console.log('rental application data', data);
  if (loading) return 'Loading';
  if (error) return <Error error={error} />;
  const {
    rentalApplication: {
      __typename,
      visibility,
      stage,
      finalised,
      owner,
      applicants,
    },
  } = data;

  const isOwner = me.id === owner.id;
  return isOwner ? (
    <OwnerView rentalApplication={data.rentalApplication} me={me} />
  ) : (
    <ApplicantView rentalApplication={data.rentalApplication} me={me} />
  );
};

export default RentalApplication;
