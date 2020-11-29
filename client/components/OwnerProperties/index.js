import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Modal from '@/Components/Modal/index';
import PropertyDetails from '@/Components/PropertyDetails/index';
import Router from 'next/router';
import Loader from '@/Components/Loader/index';
import PropertiesTable from '@/Components/Tables/PropertiesTable';
import { OWNER_PROPERTIES_QUERY } from '@/Gql/queries';
import AddIcon from '@material-ui/icons/Add';
import { ButtonGroup, Button } from '@material-ui/core';

const handleLink = (route = '/', query = {}) => {
  Router.push({
    pathname: route,
    query: query,
  });
};

/**
 * ToDo: have not finished converting to use hooks. FINISH IT!!!
 */
const OwnerProperties = ({ me }) => {
  // set initial state for functional component
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalDetailsObj, setModalDetailsObj] = useState({});
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
        <ButtonGroup
          color="secondary"
          aria-label="outlined secondary button group">
          <Button onClick={goToAddPropertyPage} startIcon={<AddIcon />}>
            Property
          </Button>
          <Button onClick={goToAddBulkProperty} startIcon={<AddIcon />}>
            Bulk Upload
          </Button>
        </ButtonGroup>
      </div>
      <PropertiesTable properties={data ? data.ownerProperties : []} me={me} />
    </>
  );
};

OwnerProperties.propTypes = {
  me: PropTypes.any,
};

export default OwnerProperties;

export { OWNER_PROPERTIES_QUERY };
