import dynamic from 'next/dynamic';
import TableSkeleton from './TableSkeleton';
import SuperiorTable from './SuperiorTable';

const DynamicSuperiorTable = dynamic(() => import('./SuperiorTable'), {
  loading: props => <TableSkeleton {...props} />,
  ssr: false,
});

export default SuperiorTable;
