import PropTypes from "prop-types";
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
  lease: PropTypes.any.isRequired,
  leaseId: PropTypes.any.isRequired,
  me: PropTypes.any.isRequired
}

export default CompletedLease;

/**
 * Here we can do things like query all the data we need, e.g payments,
 * lessees
 * lessors
 * lease
 * create direct email etc
 */
// const CompletedLease = ({ leaseId, lease, me }) => {
//   const { data, error, loading } = useQuery(PAYMENTS_QUERY, {
//     variables: {
//       where: {
//         leaseId: leaseId,
//       },
//     },
//     suspend: false,
//   });

//   if (loading) return 'Preparing Lease, please wait...';
//   if (error) return 'Error with feting lease Data';
//   return (
//     <div>
//       <h1>
//         This is like an accepted lease and all that stuff. Lotts off components
//         to come here
//       </h1>
//       <DownloadLease lease={lease} me={me} />
//       <h4>Lease Payments</h4>
//       <PaymentManager lease={lease} payments={data.payments} title="Lease" />
//     </div>
//   );
// };

// export default CompletedLease;
