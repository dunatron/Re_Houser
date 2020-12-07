import dynamic from 'next/dynamic';

const DynamicAddUserToList = dynamic(() => import('./AddUserToList'), {
  loading: () => <p>Loading add user to list component</p>,
  ssr: false,
});

export default DynamicAddUserToList;
