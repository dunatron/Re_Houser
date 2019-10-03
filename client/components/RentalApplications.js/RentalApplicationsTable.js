import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import SuperTable from '../SuperTable/index';
import SuperiorTable from '../SuperiorTable';
import Button from '@material-ui/core/Button';
import Modal from '../Modal/index';
import PropertyDetails from '../PropertyDetails/index';
import Router from 'next/router';
//icons
import DetailsIcon from '../../styles/icons/DetailsIcon';

import RentalApplication from '../RentalApplication';

const handleLink = (route = '/', query = {}) => {
  Router.push({
    pathname: route,
    query: query,
  });
};

const manageApplicationForCurrentUser = (dataObj, me) => {
  console.log('I THINK YOU NEED MORE IN YOUR DATAOBJECT =>  ', dataObj);
  const { applicants, owner, id, property, stage } = dataObj;
  // Lol i told you. the rougiue name of lease maager. ... ffs
  if (me.id === owner.id) handleLink('/my/application', { id: id });
  // tripping, no below /my/applictaio0n existss. was thinking to use lases.js for an owneer..
  //if (me.id === owner.id) return handleLink("/my/application", { leaseId: id })
};

const RentalApplicationsTable = props => {
  const { myRentalApplications, me } = props;
  console.log('myRentalApplications => ', myRentalApplications);
  console.log('thats cooll but do I haveme? => ', props);
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
          <img
            src={
              'https://www.cornwallbusinessawards.co.uk/wp-content/uploads/2017/11/dummy450x450-300x300.jpg'
            }
            style={{ width: 50, borderRadius: '50%' }}
          />
          <span>{rowData.owner ? rowData.owner.firstName : ''}</span>
        </div>
      ),
    },
    { title: 'application ID', field: 'id', filtering: false },
    { title: 'property Name', field: 'property.location' },
    { title: 'application owner', field: 'owner.firstName' },
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
