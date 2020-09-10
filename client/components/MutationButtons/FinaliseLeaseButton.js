import PropTypes from "prop-types";
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import Error from '../ErrorMessage';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import { SINGLE_LEASE_QUERY } from '../../graphql/queries';

const FINALISE_PROPERTY_LEASE_MUTATION = gql`
  mutation FINALISE_PROPERTY_LEASE_MUTATION($leaseId: ID!) {
    finalisePropertyLease(leaseId: $leaseId) {
      id
      stage
    }
  }
`;

const FinaliseLeaseBtn = ({ leaseId, stage, disabled }) => {
  const [finaliseLease, finaliseLeaseProps] = useMutation(
    FINALISE_PROPERTY_LEASE_MUTATION,
    {
      variables: {
        leaseId: leaseId,
      },
    }
  );
  if (stage === 'SIGNED') {
    return 'Lease has been signed and finalised';
  }
  return (
    <div>
      <Button
        variant="outlined"
        onClick={() => finaliseLease()}
        disabled={disabled || finaliseLeaseProps.loading}>
        {finaliseLeaseProps.loading ? 'FINALISING LEASE' : 'FINALISE LEASE'}
      </Button>
      {finaliseLeaseProps.error && <Error error={finaliseLeaseProps.error} />}
    </div>
  );
};

FinaliseLeaseBtn.propTypes = {
  disabled: PropTypes.any.isRequired,
  leaseId: PropTypes.any.isRequired,
  stage: PropTypes.string.isRequired
}

export default FinaliseLeaseBtn;
