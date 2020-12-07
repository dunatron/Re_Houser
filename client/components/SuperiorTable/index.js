import dynamic from 'next/dynamic';
import TableSkeleton from './TableSkeleton';

const DynamicSuperiorTable = dynamic(() => import('./SuperiorTable'), {
  loading: props => <TableSkeleton {...props} />,
  ssr: false,
});

export default DynamicSuperiorTable;
