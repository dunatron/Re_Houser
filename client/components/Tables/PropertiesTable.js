import React, { useState } from 'react';
import Router from 'next/router';

import SuperiorTable from '../SuperiorTable';

//icons
import DetailsIcon from '../../styles/icons/DetailsIcon';

import PropTypes from 'prop-types';
import { mePropTypes, propertyPropTypes } from '../../propTypes';

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
    ...property,
  }));

  const columns = [
    {
      field: 'owners',
      title: 'Owners',
      render: rowData => {
        return rowData.owners.map((owner, idx) => {
          return (
            <div key={owner.id}>
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
        title="Properties"
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
            tooltip: 'Manage property',
            onClick: manageProperty,
          },
        ]}
      />
    </>
  );
};

PropertiesTable.propTypes = {
  me: mePropTypes,
  properties: PropTypes.arrayOf(propertyPropTypes),
};

export default PropertiesTable;
