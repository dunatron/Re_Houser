import React, { Component, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import SuperTable from '../SuperTable/index';
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
  const [showDataModal, setShowDataModal] = useState(false);
  const [rawLeaseData, setRawLeasData] = useState({});
  const finaliseLease = () => {};
  const columnHeaders = () => {
    return [
      {
        id: 'id',
        numeric: false,
        // disablePadding: true,
        label: 'id',
        show: false,
        tableRenderKey: 'th',
        found: 'name',
        searchable: true,
      },
      {
        id: 'lessees',
        numeric: false,
        type: 'numberOfObj',
        // disablePadding: true,
        label: 'lessees',
        show: false,
        tableRenderKey: 'th',
        found: 'lessees',
        searchable: false,
      },

      {
        id: 'finalised',
        numeric: false,
        type: 'truthly',
        // disablePadding: true,
        label: 'finalised',
        show: true,
        tableRenderKey: 'th',
        found: 'finalised',
        searchable: true,
      },
      {
        id: 'location',
        numeric: false,
        // disablePadding: true,
        label: 'location',
        show: true,
        tableRenderKey: 'th',
        found: 'location',
        searchable: true,
        tableRenderProps: {
          style: {
            minWidth: '220px',
          },
        },
      },
      {
        id: 'rent',
        numeric: false,
        // disablePadding: true,
        label: 'rent',
        show: false,
        tableRenderKey: 'th',
        found: 'rent',
        searchable: true,
      },
      {
        id: 'moveInDate',
        numeric: false,
        // disablePadding: true,
        label: 'Move in date',
        show: true,
        tableRenderKey: 'th',
        found: 'moveInDate',
        searchable: true,
      },
      {
        id: 'expiryDate',
        numeric: false,
        // disablePadding: true,
        label: 'Expiry date',
        show: true,
        tableRenderKey: 'th',
        found: 'expiryDate',
        searchable: true,
      },
      // {
      //   id: "locationLng",
      //   numeric: false,
      //   // disablePadding: true,
      //   label: "locationLng",
      //   show: false,
      //   tableRenderKey: "th",
      //   found: "locationLng",
      //   searchable: true,
      // },
      // {
      //   id: "locationLat",
      //   numeric: false,
      //   // disablePadding: true,
      //   label: "locationLat",
      //   show: false,
      //   tableRenderKey: "th",
      //   found: "locationLat",
      //   searchable: true,
      // },
      // {
      //   id: "viewLease", //votes.id
      //   numeric: false,
      //   disablePadding: false,
      //   label: "View",
      //   show: true,
      //   type: "btnFunc",
      //   icon: (
      //     <Button color="primary" aria-label="Add to shopping cart">
      //       View
      //     </Button>
      //   ),
      //   funcName: "showDetails",
      //   found: "votes",
      //   tableRenderKey: "th",
      // },
      // {
      //   id: "manage", //votes.id
      //   numeric: false,
      //   disablePadding: false,
      //   label: "Manage",
      //   show: true,
      //   type: "btnFunc",
      //   icon: (
      //     <Button color="primary" aria-label="Add to shopping cart">
      //       Manage
      //     </Button>
      //   ),
      //   funcName: "manageProperty",
      //   tableRenderKey: "th",
      // },
      {
        id: 'manage', //votes.id
        numeric: false,
        disablePadding: false,
        label: 'Manage',
        show: true,
        type: 'btnFunc',
        icon: (
          <Button color="primary" aria-label="Add to shopping cart">
            Manage
          </Button>
        ),
        funcName: 'manageProperty',
        tableRenderKey: 'th',
      },
      {
        id: 'showRawData', //votes.id
        numeric: false,
        disablePadding: false,
        label: 'Manage',
        show: true,
        type: 'btnFunc',
        icon: (
          <Button color="primary" aria-label="Add to shopping cart">
            Show Raw data
          </Button>
        ),
        funcName: 'showRawData',
        tableRenderKey: 'th',
      },
    ];
  };
  const manageProperty = data => {
    handleLink('/leases/lease', { id: data.id });
  };
  const showRawData = data => {
    setRawLeasData(data);
    setShowDataModal(true);
    // alert(JSON.stringify(data, null, 2))
  };
  const executeFunctionByName = (functionName, dataObj /*, args */) => {
    switch (functionName) {
      case 'showDetails':
        showDetails(dataObj);
        break;
      case 'manageProperty':
        return manageProperty(dataObj);
      case 'showRawData':
        return showRawData(dataObj);
      default:
        alert('No function specified');
    }
  };
  return (
    <div>
      <Modal
        id="raw-lease-data-modal"
        title={`Raw Lease Data`}
        open={showDataModal}
        close={() => setShowDataModal(false)}>
        {/* {this.renderModalDetails()} */}
        <div
          style={{
            maxWidth: '100%',
            overflow: 'auto',
          }}>
          <pre>{JSON.stringify(rawLeaseData, null, 2)}</pre>
        </div>
      </Modal>
      <SuperTable
        columnHeaders={columnHeaders()}
        // tags={{
        //   found: "tags",
        //   key: "id",
        //   options: [{ name: "one", value: "one" }],
        //   // options: allTags
        //   //   ? allTags.map(t => ({ name: t.name, value: t.id }))
        //   //   : [],
        // }}

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
      />
    </div>
  );
};

export default LeasesTable;
