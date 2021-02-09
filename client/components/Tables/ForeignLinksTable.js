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
import Modal from '@/Components/Modal';

import {
  FOREIGN_LINKS_CONNECTION_QUERY,
  FOREIGN_LINKS_COUNT_QUERY,
} from '../../graphql/connections';
import { UPDATE_FOREIGN_LINK_MUTATION } from '@/Gql/mutations';
import AddForeignLink from '@/Components/ForeignLink/AddForeignLink';

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
  id,
  type = 'user',
}) => {
  const router = useRouter();

  const connectionKey = 'foreignLinksConnection'; // e.g foreignLinksConnection
  const globalStore = useContext(store);
  const { dispatch, state } = globalStore;
  const classes = useStyles();
  const client = useApolloClient();
  const tableRef = useRef(null);
  const [tableErr, setTableErr] = useState({});

  const [addLinkModelOpen, setAddLinkModalOpen] = useState(false);

  const columns = React.useMemo(
    () => [
      { title: 'name', field: 'name' },
      { title: 'url', field: 'url' },
      { title: 'notes', field: 'notes' },
      // {
      //   title: 'Open',
      //   field: 'url',
      //   render: rowData => (
      //     <div>
      //       <a href={rowData.url}>OPen</a>
      //     </div>
      //   ),
      // },
    ],
    []
  );

  const [updateLink, { data, loading, error }] = useMutation(
    UPDATE_FOREIGN_LINK_MUTATION,
    {
      onError: err => setTableErr(err),
      onCompleted: data => {},
    }
  );

  // launch modal the will do a require AddForeignLink
  const addForeignLinkBtnClick = event => setAddLinkModalOpen(true);

  const openForeignLink = (event, data) => window?.open(data.url, '_blank');

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
        searchKeysOR={['name_contains', 'url_contains']}
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
          rowData => ({
            icon: 'link',
            tooltip: `Open: ${rowData.url}`,
            isFreeAction: false,
            onClick: e => openForeignLink(e, rowData),
          }),
        ]}
        editable={{
          isEditable: rowData => true,
          onRowUpdate: (newData, oldData) =>
            updateLink({
              variables: {
                where: {
                  id: oldData.id,
                },
                data: {
                  ...(newData.name !== oldData.name && {
                    name: newData.name,
                  }),
                  ...(newData.url !== oldData.url && {
                    url: newData.url,
                  }),
                  ...(newData.notes !== oldData.notes && {
                    notes: newData.notes,
                  }),
                },
              },
            }),
        }}
      />
      <Modal
        open={addLinkModelOpen}
        title="Add Link"
        close={() => setAddLinkModalOpen(false)}>
        <AddForeignLink
          id={id}
          type={type}
          onCompleted={d => {
            setAddLinkModalOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};

ForeignLinksTable.propTypes = {
  where: PropTypes.object,
  orderBy: PropTypes.object,
};

export default ForeignLinksTable;
