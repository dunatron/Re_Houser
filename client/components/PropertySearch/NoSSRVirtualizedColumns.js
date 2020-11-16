import dynamic from 'next/dynamic';

const NoSSRVirtualizedColumns = dynamic(
  () => {
    return import('./VirtualizedColumns');
  },
  { ssr: false }
);

export default NoSSRVirtualizedColumns;
