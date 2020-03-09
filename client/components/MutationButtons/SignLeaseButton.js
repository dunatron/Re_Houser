import React, { Component } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import Error from '../ErrorMessage';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
// import { SINGLE_LEASE_QUERY } from '../LeaseManager';
import { SINGLE_LEASE_QUERY } from '../../graphql/queries';

const SIGN_LEASE_MUTATION = gql`
  mutation SIGN_LEASE_MUTATION($id: ID!, $type: String!, $leaseId: ID!) {
    signLease(id: $id, type: $type, leaseId: $leaseId) {
      message
    }
  }
`;

// update cache after sign
const updateSignageInCache = (proxy, payload, leaseId, id, type) => {
  // 1. get the lease data from the cache
  const leaseData = proxy.readQuery({
    query: SINGLE_LEASE_QUERY,
    variables: {
      where: {
        id: leaseId,
      },
    },
  });
  // 2. update the cache on success
  if (payload.data.signLease) {
    if (payload.data.signLease.__typename === 'SuccessMessage') {
      // 3. find correct user and type and update signed to true
      const userType = type === 'LESSOR' ? 'lessors' : 'lessees';
      const interestedSignerIndex = leaseData.myLease[userType].findIndex(
        lessor => lessor.id === id
      );
      leaseData.myLease[userType][interestedSignerIndex].signed = true;
      // 4. give the uses some extra notice through toast
      toast.info(<p>{payload.data.signLease.message}</p>);
    }
  }
};

// SignLeaseBtn
const SignLeaseBtn = ({ id, type, leaseId, signed }) => {
  const [signLease, signLeaseProps] = useMutation(SIGN_LEASE_MUTATION, {
    variables: {
      id: id,
      type: type,
      leaseId: leaseId,
    },
    update: (proxy, payload) =>
      updateSignageInCache(proxy, payload, leaseId, id, type),
  });
  if (signed) {
    return 'You have signed the lease';
  }
  return (
    <div>
      <Button
        variant="outlined"
        onClick={() => signLease()}
        disabled={signLeaseProps.loading}>
        {signLeaseProps.loading ? 'SIGNING LEASE' : 'SIGN LEASE'}
      </Button>
      {signLeaseProps.error && <Error error={signLeaseProps.error} />}
    </div>
  );
};

export default SignLeaseBtn;
