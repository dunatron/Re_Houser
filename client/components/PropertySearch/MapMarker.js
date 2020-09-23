import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';
import { IconButton } from '@material-ui/core';

import PropertyCard from '@/Components/PropertyCard/index';

import { CustomMarker } from 'react-instantsearch-dom-maps';

//icons
import VisibilityIcon from '@material-ui/icons/Visibility';
import Modal from '@/Components/Modal/index';
import { formatCentsToDollarsVal } from '@/Lib/formatCentsToDollars';

const MapMarker = ({ hit }) => {
  const node = useRef();
  const [showMore, setShowMore] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setShowMore(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <CustomMarker key={hit.objectID} hit={hit}>
      <div ref={node} onClick={() => setShowMore(true)} className="map-marker">
        <Modal
          title={hit.location}
          open={modalOpen}
          disableBackdrop={true}
          close={() => setModalOpen(false)}>
          <PropertyCard property={hit} isSearch={true} />
        </Modal>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}>
          {formatCentsToDollarsVal(hit.rent)}
          {showMore && (
            <IconButton onClick={() => setModalOpen(true)}>
              <VisibilityIcon />
            </IconButton>
          )}
        </div>
        {showMore && <p className="marker-location-text">{hit.location}</p>}
      </div>
    </CustomMarker>
  );
};

MapMarker.propTypes = {
  hit: PropTypes.shape({
    location: PropTypes.any,
    objectID: PropTypes.any,
    rent: PropTypes.any,
  }).isRequired,
};

export default MapMarker;
