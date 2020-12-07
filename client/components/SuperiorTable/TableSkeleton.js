import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  tableContainer: {
    marginBottom: '16px',
  },
  table: {
    minWidth: 650,
  },
  skeletonCell: {
    padding: '5px',
  },
});

const TableCellSkeleton = ({ value }) => {
  const classes = useStyles();
  return (
    <TableCell>
      <Skeleton variant="text" className={classes.skeletonCell}>
        {value}
      </Skeleton>
    </TableCell>
  );
};

const columns = [
  {
    title: 'header 1',
    field: 'col1',
  },
  {
    title: 'header 2',
    field: 'col2',
  },
  {
    title: 'header 3',
    field: 'col2',
  },
  {
    title: 'header 4',
    field: 'col2',
  },
  {
    title: 'header 5',
    field: 'col2',
  },
];

const data = [
  {
    col1: 'loading data',
    col2: 'loading data',
    col3: 'loading data',
    col4: 'loading data',
    col5: 'loading data',
  },
  {
    col1: 'loading data',
    col2: 'loading data',
    col3: 'loading data',
    col4: 'loading data',
    col5: 'loading data',
  },
  {
    col1: 'loading data',
    col2: 'loading data',
    col3: 'loading data',
    col4: 'loading data',
    col5: 'loading data',
  },
  {
    col1: 'loading data',
    col2: 'loading data',
    col3: 'loading data',
    col4: 'loading data',
    col5: 'loading data',
  },
  {
    col1: 'loading data',
    col2: 'loading data',
    col3: 'loading data',
    col4: 'loading data',
    col5: 'loading data',
  },
];

const TableSkeleton = () => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((col, idx) => (
              <TableCellSkeleton key={idx} value={col.title} />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={row.id}>
              {columns.map((col, idx) => (
                <TableCellSkeleton key={idx} value={row[col.field]} />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableSkeleton;
