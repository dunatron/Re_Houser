import PropTypes from 'prop-types';
import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { PAYMENTS_QUERY } from '../../graphql/queries/payments';
import PaymentManager from '../PaymentManager';
import DownloadLease from './DownloadLease';
import LeaseWallet from '../LeaseWallet';

const CompletedLease = ({ leaseId, lease, me }) => {
  // get payments from the lease wallet the query will be a paginated one that fetches them all
  return (
    <div>
      <DownloadLease lease={lease} me={me} />
      <h4>Lease Payments</h4>
      <LeaseWallet lease={lease} me={me} />
      {/* <PaymentManager lease={lease} payments={data.payments} title="Lease" /> */}
    </div>
  );
};

CompletedLease.propTypes = {
  lease: PropTypes.any,
  leaseId: PropTypes.any,
  me: PropTypes.any,
};

export default CompletedLease;
