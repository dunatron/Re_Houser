import PropTypes from 'prop-types';
import React from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { useCurrentUser } from '@/Components/User/index';
import Loader from '@/Components/Loader';
import Error from '@/Components/ErrorMessage';
import { SINGLE_LEASE_QUERY } from '@/Gql/queries';
import LeaseChat from './LeaseChat';

// stages
import StageInitializing from './stages/Stage_Initializing';
import StageSigned from './stages/Stage_Signed';
import StagePaid from './stages/Stage_Paid';
import { Typography } from '@material-ui/core';
import { PROPERTY_LEASE_SUBSCRIPTION } from '@/Gql/subscriptions/PropertyLeaseSub';

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

  // maybe list to a sub for this on the leaseManager?
  const handleOnSubscriptionData = ({ client, subscriptionData }) => {
    alert('Subscription data for lease manager');
  };

  useSubscription(PROPERTY_LEASE_SUBSCRIPTION, {
    onSubscriptionData: handleOnSubscriptionData,
    variables: {
      where: {
        AND: [
          {
            node: {
              id: leaseId,
            },
          },
          {},
        ],
      },
    },
  });

  if (loading) return <Loader loading={loading} text="Loading your lease" />;
  if (error) return <Error error={error} tronM="Error loading lease" />;
  const { stage, location, rent, lessors, lessees } = data.myLease;

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
  const lessorUserIds = lessors.map(lessor => lessor.user.id);

  const lesseeIds = lessees.map(lessee => lessee.id);
  const lesseeUserIds = lessees.map(lessee => lessee.user.id);

  const userIsLessor = lessorUserIds.includes(me.id);
  const userIsLessee = lesseeUserIds.includes(me.id);

  const _canView = () => {
    if (me.permissions.includes('ADMIN')) return true;
    if (userIsLessor) return true;
    if (userIsLessee) return true;
    return false;
  };

  if (!_canView()) return 'You cannot view this lease';

  let componentstage = null;

  if (stage === 'INITIALIZING')
    componentstage = (
      <StageInitializing
        lease={data.myLease}
        me={me}
        userIsLessor={userIsLessor}
        userIsLessee={userIsLessee}
      />
    );

  // Add some stuff into heres

  // everyone has signed and a lessor has finalised it. wonder if they are the last person that needs to sign if we progress the stage
  if (stage === 'SIGNED')
    componentstage = (
      <StageSigned lease={data.myLease} me={me} userIsLessor={userIsLessor} />
    );

  // The lease has been signed and a weeks worth of rent has been recieved
  if (stage === 'PAID')
    componentstage = <StagePaid lease={data.myLease} me={me} />;

  return (
    <div>
      {stage !== 'PAID' && (
        <>
          <Typography variant="h5" gutterBottom>
            Draft Lease for {data.myLease.property.location}
          </Typography>
          <Typography variant="h6" gutterBottom>
            stage: {stage}
          </Typography>
        </>
      )}
      {componentstage}
      {/* <LeaseChat leaseId={leaseId} /> */}
    </div>
  );
};

LeaseManager.propTypes = {
  leaseId: PropTypes.any.isRequired
};

export default LeaseManager;
