import React, { useState } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/client';
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

const PropertiesTable = props => {
  const { properties, me } = props;
  /**
   * We have freezeResults: true for apollo cache objects so we will have to manually add the new objects we want.
   * We should be able to just create a new instance of the object
   */
  const formattedData = properties.map(property => ({
    // id: application.id,
    // applicants: [...application.applicants],
    ...property,
  }));

  console.log('Properties Table => ', properties);

  const columns = [
    {
      field: 'owners',
      title: 'Owners',
      // render: rowData => (
      //   <div>
      //     <img src={null} style={{ width: 50, borderRadius: '50%' }} />
      //     <span>{rowData.owner ? rowData.owner.firstName : ''}</span>
      //   </div>
      // ),
      render: rowData => {
        console.log('Owners rowData => ', rowData);
        return rowData.owners.map((owner, idx) => {
          return (
            <div>
              {owner.firstName}
              {rowData.owners.length > idx + 1 ? ', ' : null}
            </div>
          );
        });
      },
    },
    { title: 'id', field: 'id', filtering: false },
    { title: 'location', field: 'location' },
    { title: 'isLeased', field: 'isLeased' },
    { title: 'advertising', field: 'onTheMarket' },
    { title: 'rent', field: 'rent', export: true },
  ];

  const manageProperty = (event, rowData) => {
    handleLink('/properties/property', {
      id: rowData.id,
    });
  };

  return (
    <>
      <SuperiorTable
        title="Rental applications table"
        columns={columns}
        data={formattedData}
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
            onClick: manageProperty,
          },
        ]}
      />
    </>
  );
};

export default PropertiesTable;
