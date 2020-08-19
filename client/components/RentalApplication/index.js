import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { SINGLE_RENTAL_APPLICATION_QUERY } from '../../graphql/queries';
import Error from '../ErrorMessage';
import { Paper, Typography } from '@material-ui/core';
import OwnerView from './views/OwnerView';
import ApplicantView from './views/ApplicantView';
import PageHeader from '../../components/PageHeader';
/**
 * page is wrapped in a must be loggedIn
 */
const RentalApplication = ({ id, me }) => {
  const { data, loading, error } = useQuery(SINGLE_RENTAL_APPLICATION_QUERY, {
    variables: {
      where: {
        id: id,
      },
    },
  });
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

  return (
    <>
      <PageHeader
        title="Rental application"
        intro={`Rental application for ${data.rentalApplication.property.location}`}
        metaData={{
          title: `${data.rentalApplication.property.location} rental application`,
          content: `Rental application for ${data.rentalApplication.property.location}`,
        }}
        children={[
          <Typography gutterBottom>
            Application ID: {data.rentalApplication.id}
          </Typography>,
        ]}
      />
      {isOwner ? (
        <OwnerView rentalApplication={data.rentalApplication} me={me} />
      ) : (
        <ApplicantView rentalApplication={data.rentalApplication} me={me} />
      )}
    </>
  );
};

export default RentalApplication;
