import dynamic from 'next/dynamic';

const NoSSRAdminAlertsSub = dynamic(() => import('./AdminAlertsContainer'), {
  loading: () => <p>Loading admin alerts subscriptions module</p>,
  ssr: false, // subs should only be in the browser
});

export default () => <NoSSRAdminAlertsSub />;
