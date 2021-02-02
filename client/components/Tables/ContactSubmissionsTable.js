import React, { useRef, useState, useContext, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { store } from '../../store';
import { useApolloClient, useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
// import MaterialTable from 'material-table';
import ConnectionTable, {
  getEnumLookupList,
} from '@/Components/SuperiorTable/ConnectionTable';

//components
import Error from '@/Components/ErrorMessage';
import { Typography } from '@material-ui/core';

import formatCentsToDollars from '@/Lib/formatCentsToDollars';
import moment from 'moment';

import SinglePayment from '@/Components/Payments/SinglePayment';
import Modal from '@/Components/Modal/index';
import PrivateUserDetails from '@/Components/User/PrivateUserDetails';

import {
  CONTACT_SUBMISSIONS_CONNECTION_QUERY,
  CONTACT_SUBMISSIONS_COUNT_QUERY,
} from '../../graphql/connections';
// mutations
import { UPDATE_CONTACT_SUBMISSION_MUTATION } from '@/Gql/mutations';

const useStyles = makeStyles(theme => ({
  root: {},
  tableHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
}));
// Note havnt done anything except rename component from PropertiesTable to ChargesTable
const ContactSubmissionsTable = ({
  where,
  me,
  orderBy = 'createdAt_DESC',
  enableAddressParams,
}) => {
  const router = useRouter();

  const connectionKey = 'contactSubmissionsConnection'; // e.g inspectionsConnection
  const globalStore = useContext(store);
  const { dispatch, state } = globalStore;
  const classes = useStyles();
  const tableRef = useRef(null);
  const [tableErr, setTableErr] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [contactSubmissionData, setContactSubmissionData] = useState(null);

  // createdAt: DateTime! @createdAt
  // updatedAt: DateTime! @updatedAt
  // phone: String
  // email: String!
  // seen: Boolean
  // notes: String
  // message: String!
  const columns = useMemo(
    () => [
      {
        title: 'firstName',
        field: 'firstName',
      },
      {
        title: 'lastName',
        field: 'lastName',
      },
      {
        title: 'Member?',
        field: 'email',
        editable: false,
        sorting: false,
        render: rowData => <PrivateUserDetails email={rowData.email} />,
      },
      {
        title: 'phone',
        field: 'phone',
      },
      {
        title: 'email',
        field: 'email',
      },
      {
        title: 'seen',
        field: 'seen',
        type: 'boolean',
      },
      {
        title: 'notes',
        field: 'notes',
      },
      {
        title: 'message',
        field: 'message',
        editable: false,
      },
      {
        title: 'createdAt',
        field: 'createdAt',
        editable: false,
        type: 'date',
        sorting: true,
      },
      {
        title: 'updatedAt',
        field: 'updatedAt',
        editable: false,
        type: 'date',
        sorting: true,
      },
    ],
    []
  );

  const handleModalClose = () => setModalIsOpen(false);

  const viewContactSubmission = (e, rowData) => {
    setContactSubmissionData(rowData);
    setModalIsOpen(true);
  };

  const handleOnClickDelete = () => alert('I do these functions last');

  const [updateContactSubmission, updateContactSubmissionProps] = useMutation(
    UPDATE_CONTACT_SUBMISSION_MUTATION,
    {
      onError: err => setTableErr(err),
      onCompleted: data => {},
    }
  );

  return (
    <div className={classes.root}>
      <Error error={tableErr} />
      <ConnectionTable
        enableAddressParams={enableAddressParams}
        title="Contact Submissions Table"
        connectionKey={connectionKey}
        where={where}
        countQuery={CONTACT_SUBMISSIONS_COUNT_QUERY}
        gqlQuery={CONTACT_SUBMISSIONS_CONNECTION_QUERY}
        searchKeysOR={[
          'id_contains',
          'email_contains',
          'firstName_contains',
          'lastName_contains',
          'phone_contains',
        ]}
        orderBy="createdAt_DESC"
        tableRef={tableRef}
        columns={columns}
        actions={[
          {
            icon: 'settings',
            tooltip: 'View Contact Submission',
            onClick: viewContactSubmission,
          },

          {
            icon: 'delete',
            tooltip: 'Delete Contact Submission',
            onClick: handleOnClickDelete,
          },
        ]}
        editable={{
          isEditable: rowData => true, // needs to be func, and we always allo edit at this stage
          onRowUpdate: (newData, oldData) =>
            updateContactSubmission({
              variables: {
                where: {
                  id: oldData.id,
                },
                data: {
                  // completed: isCompleted(newData.completed),
                  // notes: newData.notes,
                  ...(newData.phone !== oldData.phone && {
                    phone: newData.phone,
                  }),
                  ...(newData.notes !== oldData.notes && {
                    notes: newData.notes,
                  }),
                  ...(newData.seen !== oldData.seen && {
                    seen: newData.seen,
                  }),
                },
              },
            }),
        }}
      />
      <Modal open={modalIsOpen} close={handleModalClose} disableBackdrop={true}>
        {JSON.stringify(contactSubmissionData, null, 2)}
      </Modal>
    </div>
  );
};

export default ContactSubmissionsTable;
