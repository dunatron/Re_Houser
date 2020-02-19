import React, { useState } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, Typography } from '@material-ui/core';

import SuperTable from '../SuperTable/index';
import SuperiorTable from '../SuperiorTable';
import Modal from '../Modal/index';
import PropertyDetails from '../PropertyDetails/index';
import RentalApplication from '../RentalApplication';

//icons
import DetailsIcon from '../../styles/icons/DetailsIcon';

const handleLink = (route = '/', query = {}) => {
  Router.push({
    pathname: route,
    query: query,
  });
};

const manageApplicationForCurrentUser = (dataObj, me) => {
  const { applicants, owner, id, property, stage } = dataObj;
  // Lol i told you. the rougiue name of lease maager. ... ffs
  if (me.id === owner.id) handleLink('/my/application', { id: id });
  // tripping, no below /my/applictaio0n existss. was thinking to use lases.js for an owneer..
  //if (me.id === owner.id) return handleLink("/my/application", { leaseId: id })
};

const RentalApplicationsTable = props => {
  const { myRentalApplications, me } = props;
  /**
   * We have freezeResults: true for apollo cache objects so we will have to manually add the new objects we want.
   * We should be able to just create a new instance of the object
   */
  const formattedData = myRentalApplications.map(application => ({
    // id: application.id,
    // applicants: [...application.applicants],
    ...application,
  }));

  const columns = [
    {
      field: 'owner.firstName',
      title: 'Owner',
      render: rowData => (
        <div>
          <img src={null} style={{ width: 50, borderRadius: '50%' }} />
          <span>{rowData.owner ? rowData.owner.firstName : ''}</span>
        </div>
      ),
    },
    { title: 'id', field: 'id', filtering: false },
    { title: 'location', field: 'property.location' },
    { title: 'owner', field: 'owner.firstName' },
    { title: 'stage', field: 'stage', export: true },
  ];
  const detailPanel = [
    {
      tooltip: 'Manage application inline',
      render: rowData => {
        return (
          <div
            style={{
              textAlign: 'center',
              color: 'white',
              backgroundColor: '#43A047',
            }}>
            <RentalApplication id={rowData.id} me={me} />
          </div>
        );
      },
    },
    {
      icon: 'account_circle',
      tooltip: 'Show applicants',
      render: rowData => {
        return (
          <div
            style={{
              textAlign: 'center',
              color: 'white',
              backgroundColor: '#E53935',
            }}>
            <div>
              I will map over applicants, displaying a user icon. A User Icon
              will have an id and name etc, It will be able to fetch all User
              info
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Typography variant="body1" gutterBottom>
        INITIALIZING => The owner of the application needs to accept the
        applicants for the application before it is sent to the landlord.
        <br /> You can have as many or as little applicants as you like
      </Typography>
      <Typography variant="body1" gutterBottom>
        PENDING => The landlord has recieved your application and will either
        "APPROVE" or "DENY" it.
      </Typography>
      <Typography variant="body1" gutterBottom>
        ACCEPTED => The application has been accepted and a new "Lease" entity
        has been created for yourself, other tenants, and the landlord. <br />
        Head to the "leases" using the navigation to sign the lease
      </Typography>
      <Typography variant="body1" gutterBottom>
        ToDo: create a new text field on the RentalApplication like
        "createdLeaseId" which will be updated with the lease id from the newly
        created lease. SImply so we can refer to it here and send people away to
        the link on "ACCEPTED" stage
      </Typography>
      <SuperiorTable
        title="Rental applications table"
        columns={columns}
        data={formattedData}
        detailPanel={detailPanel}
        options={{
          search: true,
          exportButton: true,
          exportAllData: true, // Flag for export all data instead of rendered data
          filtering: true,
          grouping: true,
          // selection: true,
          sorting: true,
        }}
        actions={[
          {
            icon: 'settings',
            tooltip: 'Manage application',
            onClick: (event, rowData) => {
              manageApplicationForCurrentUser(rowData, me);
            },
          },
        ]}
      />
    </>
  );
};

// PropTypes
RentalApplicationsTable.propTypes = {
  // me: yea not adding me to PropTypes find it somewhere else
  myRentalApplications: PropTypes.arrayOf(
    PropTypes.shape({
      applicants: PropTypes.arrayOf(
        PropTypes.shape({
          approved: PropTypes.string,
          completed: PropTypes.string,
          id: PropTypes.sting,
          __typename: PropTypes.string,
        })
      ),
      id: PropTypes.string,
      owner: PropTypes.shape({
        firsName: PropTypes.string,
        id: PropTypes.string,
      }),
      property: PropTypes.shape({
        id: PropTypes.string,
        location: PropTypes.string,
        rent: PropTypes.string,
        rooms: PropTypes.string,
        __typename: PropTypes.string,
      }),
      stage: PropTypes.string,
      __typename: PropTypes.string,
    })
  ),
};

export default RentalApplicationsTable;
