import dynamic from 'next/dynamic';

const NoSSRAdminAlertsSub = dynamic(() => import('./AdminAlertsContainer'), {
  ssr: false,
});

export default () => <NoSSRAdminAlertsSub />;
