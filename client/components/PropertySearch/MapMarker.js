import React, { useState, useRef, useEffect } from 'react';

// import Drawer from '@material-ui/core/Drawer';
import { IconButton } from '@material-ui/core';

import PropertyCard from '../PropertyCard/index';

import { CustomMarker } from 'react-instantsearch-dom-maps';
import GeoSearch from './GeoSearch';

// import Places from './places/widget';

//icons
import VisibilityIcon from '@material-ui/icons/Visibility';

import dynamic from 'next/dynamic';
import Modal from '../../components/Modal/index';

const DynamicPlacesSearch = dynamic(import('./places/widget'), {
  ssr: false,
});

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
          ${hit.rent}
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

export default MapMarker;
