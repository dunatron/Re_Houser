import dynamic from 'next/dynamic';

const NoSSRGeneralSubs = dynamic(() => import('./GeneralSubsContainer'), {
  ssr: false,
});

export default () => <NoSSRGeneralSubs />;
