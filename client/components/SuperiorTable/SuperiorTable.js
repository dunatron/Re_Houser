import MaterialTable from 'material-table';
import tableIcons from './tableIcons';
import PropTypes from 'prop-types';

const SuperiorTable = props => {
  const { title, columns, data, options } = props;
  return (
    <MaterialTable
      {...props}
      style={{ marginBottom: '16px' }}
      icons={tableIcons}
      columns={columns}
      data={data}
      title={title}
      options={{
        draggable: false, // now we can have it SSR
        emptyRowsWhenPaging: false,
        search: true,
        pageSizeOptions: [5, 10, 20, 40],
        ...options,
      }}
    />
  );
};

SuperiorTable.propTypes = {
  columns: PropTypes.any,
  data: PropTypes.any,
  title: PropTypes.any,
};

SuperiorTable.propTypes = PropTypes.instanceOf(MaterialTable);

export default SuperiorTable;
