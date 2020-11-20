import dynamic from 'next/dynamic';

const NoSSRGeneralUserSubs = dynamic(() => import('./NoSSRGeneralUserSubs'), {
  ssr: false,
});

export default () => <NoSSRGeneralUserSubs />;
