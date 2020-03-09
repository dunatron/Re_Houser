//myLease

import React, { Component } from 'react';
import { adopt } from 'react-adopt';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import { useCurrentUser } from '../User/index';
import Error from '../ErrorMessage';
import FinaliseLeaseBtn from '../MutationButtons/FinaliseLeaseButton';
import SignLeaseBtn from '../MutationButtons/SignLeaseButton';
import CompletedLease from './CompletedLease';
import SignLease from './SignLease';
import { SINGLE_LEASE_QUERY } from '../../graphql/queries';

const LeaseManager = ({ leaseId }) => {
  const user = useCurrentUser();
  const me = user.data ? user.data.me : null;
  const { data, error, loading } = useQuery(SINGLE_LEASE_QUERY, {
    variables: {
      where: {
        id: leaseId,
      },
    },
    suspend: false,
  });

  if (loading) return 'Preparing Lease, please wait...';
  if (error) return 'Error with feting lease Data';
  const { finalised, location, rent, lessors, lessees } = data.myLease;

  /**
   * This may have a few bad consequences, you will be changing props which
   * will probably try to rerender this component again resulting in it trying to
   * route again.
   * Can maybe rely on react/next(router) to be smart enough
   */
  // if (finalised) return <CompletedLease />
  if (!me) return 'Ohhh you must be signed in to accept leases';
  // 1. we need to extract the lessor or lessee information for this lease for the current signed in user
  const lessorIds = lessors.map(lessor => lessor.id);
  const lessorUserIds = lessees.map(lessor => lessor.user.id);

  // 1. if lease has been finalised <CompletedLease />
  if (finalised)
    return (
      <CompletedLease leaseId={data.myLease.id} lease={data.myLease} me={me} />
    );
  // 2. we need to sign the lease <CompletedLease />
  return <SignLease lease={data.myLease} me={me} />;
};

export default LeaseManager;
