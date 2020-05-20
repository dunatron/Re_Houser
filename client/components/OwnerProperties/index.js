import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { useQuery, useMutation } from '@apollo/client';
import Error from '../ErrorMessage/index';
import SuperTable from '../SuperTable/index';
import Modal from '../Modal/index';
import PropertyDetails from '../PropertyDetails/index';
import { ToastContainer, toast } from 'react-toastify';
import Router from 'next/router';
import { graphql, withApollo } from 'react-apollo';
import { PROPERTIES_QUERY } from '../../graphql/queries/index';
import ActivityManager from '../ActivityManager/index';
import Loader from '../Loader/index';
import ChangeRouteButton from '../Routes/ChangeRouteButton';
import PropertiesTable from '../Tables/PropertiesTable';
import { OWNER_PROPERTIES_QUERY } from '../../graphql/queries';

import { Button } from '@material-ui/core';

const handleLink = (route = '/', query = {}) => {
  Router.push({
    pathname: route,
    query: query,
  });
};

// const OWNER_PROPERTIES_QUERY = gql`
//   query OWNER_PROPERTIES_QUERY {
//     ownerProperties {
//       id
//       rooms
//       rent
//       moveInDate
//       expiryDate
//       onTheMarket
//       location
//       locationLat
//       locationLng
//       owners {
//         id
//         email
//         firstName
//       }
//       images {
//         url
//       }
//       isLeased
//     }
//   }
// `;

const UPDATE_PROPERTY_MUTATION = gql`
  mutation UPDATE_PROPERTY_MUTATION($id: ID!, $data: PropertyUpdateInput!) {
    updateProperty(id: $id, data: $data) {
      id
      onTheMarket
      location
    }
  }
`;

/**
 * ToDo: have not finished converting to use hooks. FINISH IT!!!
 */
const OwnerProperties = ({ me }) => {
  // set initial state for functional component
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalDetailsObj, setModalDetailsObj] = useState({});
  const [updateData, setUpdateData] = useState({});
  // setup our gql queries for functional component
  const { data, loading, error } = useQuery(OWNER_PROPERTIES_QUERY);

  const showDetails = dataObj => {
    openModal();
    setModalDetailsObj(dataObj);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const openModal = () => {
    setModalIsOpen(true);
  };

  const renderModalDetails = () => {
    const { id, location, rent } = modalDetailsObj;
    return <PropertyDetails id={id} location={location} />;
  };

  const manageProperty = data => {
    handleLink('/properties/property', { id: data.id });
  };

  const toggleOnTheMarket = dataObj => {
    const current = dataObj.onTheMarket;
    props.updateProperty({
      variables: { id: dataObj.id, onTheMarket: !current },
    });
  };

  const executeFunctionByName = (functionName, dataObj /*, args */) => {
    switch (functionName) {
      case 'showDetails':
        showDetails(dataObj);
        break;
      case 'manageProperty':
        return manageProperty(dataObj);
      case 'toggleOnTheMarket':
        return toggleOnTheMarket(dataObj);
      default:
        alert('No function specified');
    }
  };

  if (loading) {
    return <Loader loading={loading} text="Loading your properties" />;
  }
  return (
    <>
      <Modal
        title={`Property Viewer`}
        open={modalIsOpen}
        close={() => closeModal()}>
        {renderModalDetails()}
      </Modal>
      <PropertiesTable properties={data ? data.ownerProperties : []} me={me} />
    </>
  );
};

export default OwnerProperties;

export { OWNER_PROPERTIES_QUERY };
