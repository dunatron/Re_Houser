import React, { Component, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import Button from '@material-ui/core/Button';
import ChangeRouteButton from '../Routes/ChangeRouteButton';
import { toast } from 'react-toastify';
import Router from 'next/router';
import Modal from '../Modal/index';
import moment from 'moment';

const handleLink = (route = '/', query = {}) => {
  Router.push({
    pathname: route,
    query: query,
  });
};

const LeasesTable = ({ leases }) => {
  const prettyLeases = leases.map(lease => {
    const prettifiedData = {
      ...lease,
      moveInDate: moment(lease.moveInDate).format(
        'dddd, MMMM Do YYYY, h:mm:ss a'
      ),
    };
    return prettifiedData;
  });

  const manageProperty = data => {
    handleLink('/leases/lease', { id: data.id });
  };

  return (
    <div>
      <h2>
        SuperTable SUPER TABLE has been REMOVED IN FAVOR OF SUPPERIOR TABLE
      </h2>
      {/* <SuperTable
        columnHeaders={columnHeaders()}
        title="My Leases"
        data={prettyLeases}
        executeFunc={async (funcName, obj) => {
          switch (funcName) {
            case 'toggleOnTheMarket':
              await this.setState({ updateData: obj });
              return this._updateProperty(updateProperty, obj);
            default:
              return executeFunctionByName(funcName, obj);
          }
        }}
      /> */}
    </div>
  );
};

export default LeasesTable;
