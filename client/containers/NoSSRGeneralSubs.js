import dynamic from 'next/dynamic';

const NoSSRGeneralSubs = dynamic(() => import('./GeneralSubsContainer'), {
  loading: () => <p>Loading general subscriptions module</p>,
  ssr: false, // subs should only be in the browser
});

export default () => <NoSSRGeneralSubs />;
