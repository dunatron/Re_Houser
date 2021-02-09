import React, { useRef, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { store } from '../../store';
import { useApolloClient, useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
// import MaterialTable from 'material-table';
import ConnectionTable, {
  getEnumLookupList,
} from '@/Components/SuperiorTable/ConnectionTable';

//components
import Error from '@/Components/ErrorMessage';
import UserDetails from '../../components/UserDetails';
import List from '@material-ui/core/List';

import {
  FOREIGN_LINKS_CONNECTION_QUERY,
  FOREIGN_LINKS_COUNT_QUERY,
} from '../../graphql/connections';
import { UPDATE_INSPECTION_MUTATION } from '@/Gql/mutations';
// mutations

const useStyles = makeStyles(theme => ({
  root: {},
  tableHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
}));

const ForeignLinksTable = ({
  where,
  me,
  orderBy = 'createdAt_DESC',
  enableAddressParams,
}) => {
  const router = useRouter();

  const connectionKey = 'foreignLinksConnection'; // e.g foreignLinksConnection
  const globalStore = useContext(store);
  const { dispatch, state } = globalStore;
  const classes = useStyles();
  const client = useApolloClient();
  const tableRef = useRef(null);
  const [tableErr, setTableErr] = useState({});

  const columns = React.useMemo(
    () => [
      { title: 'id', field: 'id', editable: false },
      { title: 'name', field: 'name', editable: true },
      { title: 'url', field: 'url', editable: true },
      { title: 'notes', field: 'notes', editable: true },
    ],
    []
  );

  //   const [updateInspection, updateInspectionProps] = useMutation(
  //     UPDATE_INSPECTION_MUTATION,
  //     {
  //       onError: err => setTableErr(err),
  //       onCompleted: data => {},
  //     }
  //   );

  // launch modal the will do a require AddForeignLink
  const addForeignLinkBtnClick = event => alert('ToDo: add foreign link');

  return (
    <div className={classes.root}>
      <Error error={tableErr} />
      <ConnectionTable
        enableAddressParams={enableAddressParams}
        title="Foreign Links"
        connectionKey={connectionKey}
        where={where}
        countQuery={FOREIGN_LINKS_COUNT_QUERY}
        gqlQuery={FOREIGN_LINKS_CONNECTION_QUERY}
        searchKeysOR={['name_contains', 'id_contains']}
        orderBy="createdAt_DESC"
        tableRef={tableRef}
        columns={columns}
        actions={[
          {
            icon: 'add',
            tooltip: 'Add User',
            isFreeAction: true,
            onClick: addForeignLinkBtnClick,
          },
        ]}
        editable={{
          isEditable: rowData => rowData.completed === false,
          onRowUpdate: (newData, oldData) => {
            // updateInspection({
            //   variables: {
            //     where: {
            //       id: oldData.id,
            //     },
            //     data: {
            //       completed: isCompleted(newData.completed),
            //       notes: newData.notes,
            //     },
            //   },
            // });
          },
        }}
      />
    </div>
  );
};

ForeignLinksTable.propTypes = {
  where: PropTypes.object,
  orderBy: PropTypes.object,
};

export default ForeignLinksTable;
