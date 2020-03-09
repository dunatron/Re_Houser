import React, { Component } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import Error from '../ErrorMessage';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
// import { SINGLE_LEASE_QUERY } from '../LeaseManager';
import { SINGLE_LEASE_QUERY } from '../../graphql/queries';

const FINALISE_PROPERTY_LEASE_MUTATION = gql`
  mutation FINALISE_PROPERTY_LEASE_MUTATION($leaseId: ID!) {
    finalisePropertyLease(leaseId: $leaseId) {
      message
      data
    }
  }
`;

const FinaliseLeaseBtn = ({ leaseId, finalised }) => {
  const [finaliseLease, finaliseLeaseProps] = useMutation(
    FINALISE_PROPERTY_LEASE_MUTATION,
    {
      variables: {
        leaseId: leaseId,
      },
      update: (proxy, payload) => {
        const leaseData = proxy.readQuery({
          query: SINGLE_LEASE_QUERY,
          variables: {
            where: {
              id: leaseId,
            },
          },
        });
        if (payload.data.finalisePropertyLease) {
          if (
            payload.data.finalisePropertyLease.__typename === 'SuccessMessage'
          ) {
            leaseData.myLease.finalised = true;
            toast.info(
              <div>
                <p>{payload.data.finalisePropertyLease.message}</p>
                <p>{JSON.stringify(payload.data.finalisePropertyLease.data)}</p>
              </div>
            );
          }
        }
      },
    }
  );
  if (finalised) {
    return 'Lease has been signed and finalised';
  }
  return (
    <div>
      <Button
        variant="outlined"
        onClick={() => finaliseLease()}
        disabled={finaliseLeaseProps.loading}>
        {finaliseLeaseProps.loading ? 'FINALISING LEASE' : 'FINALISE LEASE'}
      </Button>
      {finaliseLeaseProps.error && <Error error={finaliseLeaseProps.error} />}
    </div>
  );
};

export default FinaliseLeaseBtn;
