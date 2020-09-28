import PropTypes from 'prop-types';
import RehouserPaper from '@/Styles/RehouserPaper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  Badge,
  IconButton,
  Icon,
  Tooltip,
  ButtonGroup,
  Button,
} from '@material-ui/core';

import RToolTip from '@/Styles/RToolTip';
import Apply from '@/Components/PropertyCard/Apply';

//icons
import BathtubIcon from '@material-ui/icons/Bathtub';
import ApartmentIcon from '@material-ui/icons/Apartment';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import CarouselSlider from '@/Components/CarouselSlider';
import React, { useState } from 'react';

import Modal from '@/Components/Modal';

// Modal Contents
import Map from '@/Components/Map';
import PublicProperty from '@/Components/PublicProperty';

import RentalApplications from '@/Components/PropertyCard/RentalApplications';
import Viewings from '@/Components/Viewings/index';

const StyledBadge = withStyles(theme => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const useStyles = makeStyles(theme => ({
  root: {
    // margin: theme.spacing(1),
    margin: 0,
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: '920px',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '920px',
      flexWrap: 'wrap',
    },
    [theme.breakpoints.up(720)]: {
      flexWrap: 'noWrap',
    },
  },
  imageContainer: {
    height: 'auto',
    minHeight: '200px',
    minWidth: '200px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      height: 'auto',
      width: '220px',
      minWidth: '220px',
    },
    [theme.breakpoints.up('md')]: {
      height: 'auto',
      width: '350px',
      minWidth: '350px',
    },
  },
  detailsContainer: {
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      //   maxWidth: '220px',
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: 'none',
    },
  },
  actionsContainer: {
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    maxWidth: '320px',
  },
  detailItems: {
    display: 'flex',
    marginTop: theme.spacing(2),
  },
}));

const DetailItem = ({ hit, conf }) => {
  return (
    <div style={{ marginRight: '32px' }}>
      <RToolTip
        title={`${conf.title}: ${hit[conf.name]}`}
        style={{ fontSize: '16px' }}>
        <StyledBadge badgeContent={hit[conf.name]} color="secondary">
          {conf.icon}
        </StyledBadge>
      </RToolTip>
    </div>
  );
};

DetailItem.propTypes = {
  conf: PropTypes.shape({
    icon: PropTypes.any,
    name: PropTypes.any,
    title: PropTypes.any,
  }).isRequired,
  hit: PropTypes.any.isRequired,
};

const DetailItemsArr = [
  {
    title: 'rooms',
    name: 'rooms',
    icon: <ApartmentIcon fontSize="large" color="primary" />,
  },
  {
    title: 'bathrooms',
    name: 'bathrooms',
    icon: <BathtubIcon fontSize="large" color="primary" />,
  },
  {
    title: 'carportSpaces',
    name: 'carportSpaces',
    icon: <EmojiTransportationIcon fontSize="large" color="primary" />,
  },
  {
    title: 'garageSpaces',
    name: 'garageSpaces',
    icon: <DriveEtaIcon fontSize="large" color="primary" />,
  },
];

const PropertyResultHit = ({ hit, me }) => {
  const classes = useStyles();
  const [modalIdx, setModalIdx] = useState();
  return (
    <Paper square className={classes.root}>
      {/* Images Container */}
      <div className={classes.imageContainer}>
        {hit.imageUrls.length > 0 && (
          <CarouselSlider
            height={'100%'}
            slides={hit.imageUrls.map(imgUrl => ({ img: imgUrl }))}
          />
        )}
      </div>
      {/* Details Container */}
      <RehouserPaper className={classes.detailsContainer} elevation={0}>
        <Typography variant="h6" color="textPrimary" gutterBottom>
          {hit.location}
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          ${hit.rent}{' '}
          <Typography component="span" color="textSecondary">
            with an average of
          </Typography>{' '}
          ${hit.rent / hit.rooms}
        </Typography>
        <Typography gutterBottom color="textSecondary">
          {hit.type}
        </Typography>
        <div className={classes.detailItems}>
          {DetailItemsArr.map((conf, i) => {
            return <DetailItem key={i} hit={hit} conf={conf} />;
          })}
        </div>
      </RehouserPaper>
      {/* Actions Container */}
      <RehouserPaper className={classes.actionsContainer} elevation={0}>
        <ButtonGroup
          orientation="vertical"
          color="primary"
          size="small"
          variant="text"
          aria-label="property actions">
          <Button onClick={() => setModalIdx('Details')}>More details</Button>
          <Button onClick={() => setModalIdx('Share')}>Share to social</Button>
          <Button onClick={() => setModalIdx('Viewings')}>Viewings</Button>
          <Button onClick={() => setModalIdx('Map')}>Show Map</Button>
          <Button onClick={() => setModalIdx('Applications')}>
            Applications
          </Button>
        </ButtonGroup>
      </RehouserPaper>
      <Modal
        disableBackdrop={true}
        open={modalIdx ? true : false}
        close={() => setModalIdx(null)}
        title={`${modalIdx} for ${hit.location}`}>
        {modalIdx === 'Details' && <PublicProperty propertyId={hit.id} />}
        {modalIdx === 'Share' && <div>share Modal content</div>}
        {modalIdx === 'Viewings' && (
          <Viewings
            propertyId={hit.id}
            disableCreate={true}
            where={{
              property: {
                id: hit.id,
              },
            }}
          />
        )}
        {modalIdx === 'Map' && (
          <Map
            center={{
              lat: hit._geoloc.lat,
              lng: hit._geoloc.lng,
            }}
            height={'900px'}
          />
        )}
        {modalIdx === 'Applications' && (
          <>
            <Apply property={hit} />
            <Typography variant="h6">Other Applications</Typography>
            <RentalApplications
              property={hit}
              // property={props.property}
              propertyId={hit.id}
              me={me}
              openRentalAppModal={rentalData => {
                // setModalIsOpen(true);
                // setApplicationData(rentalData);
              }}
            />
          </>
        )}
      </Modal>
    </Paper>
  );
};

PropertyResultHit.propTypes = {
  hit: PropTypes.shape({
    _geoloc: PropTypes.shape({
      lat: PropTypes.any,
      lng: PropTypes.any,
    }),
    id: PropTypes.any,
    imageUrls: PropTypes.shape({
      length: PropTypes.number,
      map: PropTypes.func,
    }),
    location: PropTypes.any,
    rent: PropTypes.any,
    rooms: PropTypes.any,
    type: PropTypes.any,
  }).isRequired,
};

const MemoizedPropertyResultHit = React.memo(PropertyResultHit);

export default MemoizedPropertyResultHit;

// export default PropertyResultHit;
