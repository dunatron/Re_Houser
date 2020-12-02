import AdminAlertNewRentalApplicationSub from '../components/SubscriptionComponents/AdminAlertNewRentalApplicationSub';
import AdminNewPropertyAppraisalSub from '../components/SubscriptionComponents/AdminNewPropertyAppraisalSub';
import PropertiesSub from '../components/SubscriptionComponents/PropertiesSub';
import { useCurrentUser } from '@/Components/User';
/**
 * I am Simply a wrapper for all alerts admin
 * // Maybe 1 small advancement we can make wth alerts is a simple where?
 * // We know what they are essentially, so just be smart with the where
 */
export default AdminAlertsContainer = props => {
  const { data, error, loading } = useCurrentUser();

  if (loading)
    return (
      <Loader loading={loading} text="Loading your data for general subs" />
    );

  if (error) return <Error error={error} />;

  const me = data ? data.me : null;
  if (!me) return null;
  const { permissions, adminSettings } = me;
  const canSubscribe = permissions.includes('ADMIN');
  if (!canSubscribe) return null;
  return (
    <>
      {adminSettings && adminSettings.rentalApplicationCreatedSub && (
        <AdminAlertNewRentalApplicationSub />
      )}

      {/* Rental Appraisal created sub */}
      {adminSettings && adminSettings.appraisalCreatedSub && (
        <AdminNewPropertyAppraisalSub />
      )}
      {adminSettings && adminSettings.propertyCreatedSub && (
        <PropertiesSub where={{ mutation_in: 'CREATED' }} />
      )}
    </>
  );
};
