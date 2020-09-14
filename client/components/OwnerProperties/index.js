import PropTypes from 'prop-types';
import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { useQuery, useMutation } from '@apollo/client';
import Error from '../ErrorMessage/index';

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
import AddIcon from '@material-ui/icons/Add';

import { Button } from '@material-ui/core';

const handleLink = (route = '/', query = {}) => {
  Router.push({
    pathname: route,
    query: query,
  });
};

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
    handleLink('/landlord/properties/property', { id: data.id });
  };

  const goToAddPropertyPage = () => {
    handleLink('/landlord/properties/add');
  };

  const goToAddBulkProperty = () => {
    handleLink('/landlord/properties/bulkadd');
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
      <div style={{ marginBottom: '16px' }}>
        <Button
          onClick={goToAddPropertyPage}
          color="primary"
          startIcon={<AddIcon />}
          variant="contained">
          Property
        </Button>
        <Button onClick={goToAddBulkProperty}>Bulk Upload</Button>
      </div>
      <PropertiesTable properties={data ? data.ownerProperties : []} me={me} />
    </>
  );
};

OwnerProperties.propTypes = {
  me: PropTypes.any.isRequired,
};

export default OwnerProperties;

export { OWNER_PROPERTIES_QUERY };
