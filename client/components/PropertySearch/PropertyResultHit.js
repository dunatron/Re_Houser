import RehouserPaper from '../../styles/RehouserPaper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  Badge,
  IconButton,
  Icon,
  Tooltip,
  Button,
} from '@material-ui/core';

import RToolTip from '../../styles/RToolTip';
import Apply from '../PropertyCard/Apply';

//icons
import BathtubIcon from '@material-ui/icons/Bathtub';
import ApartmentIcon from '@material-ui/icons/Apartment';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import CarouselSlider from '../CarouselSlider';
import { useState } from 'react';

import Modal from '../Modal';

// Modal Contents
import Map from '../Map';
import PublicProperty from '../PublicProperty';

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
    margin: theme.spacing(1),
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: '920px',
    // [theme.breakpoints.up(600)]: {
    //   flexWrap: 'noWrap',
    // },
    [theme.breakpoints.up('sm')]: {
      maxWidth: '920px',
      flexWrap: 'wrap',
    },
    [theme.breakpoints.up(720)]: {
      flexWrap: 'noWrap',
    },
    // [theme.breakpoints.up('md')]: {
    //   maxWidth: '1100px',
    //   flexWrap: 'nowrap',
    // },
  },
  imageContainer: {
    height: '200px',
    height: 'auto',
    minHeight: '200px',
    minWidth: '200px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      height: '243px',
      height: 'auto',
      width: '220px',
      minWidth: '220px',
    },
    [theme.breakpoints.up('md')]: {
      height: '200px',
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
    // marginBottom: '0 !important',
    alignItems: 'flex-end',
    maxWidth: '320px',
  },
  detailItems: {
    display: 'flex',
    marginTop: theme.spacing(2),
    // padding: theme.spacing(2)
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

const PropertyResultHit = ({ hit }) => {
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
            return <DetailItem hit={hit} conf={conf} />;
          })}
        </div>
      </RehouserPaper>
      {/* Actions Container */}
      <RehouserPaper className={classes.actionsContainer} elevation={0}>
        <Button
          color="secondary"
          size="small"
          onClick={() => setModalIdx('details')}>
          More details
        </Button>
        <Button
          color="secondary"
          size="small"
          onClick={() => setModalIdx('share')}>
          Share to social
        </Button>
        <Button
          color="secondary"
          size="small"
          onClick={() => setModalIdx('viewings')}>
          Viewings
        </Button>
        <Button
          color="secondary"
          size="small"
          onClick={() => setModalIdx('map')}>
          Show Map
        </Button>
        <Apply property={hit} />
      </RehouserPaper>
      <Modal
        open={modalIdx ? true : false}
        close={() => setModalIdx(null)}
        title={modalIdx}>
        {modalIdx === 'details' && <PublicProperty propertyId={hit.id} />}
        {modalIdx === 'share' && <div>share Modal content</div>}
        {modalIdx === 'viewings' && <div>viewings Modal content</div>}
        {modalIdx === 'map' && (
          <Map
            center={{
              lat: hit._geoloc.lat,
              lng: hit._geoloc.lng,
            }}
            height={'900px'}
          />
        )}
      </Modal>
    </Paper>
  );
};

export default PropertyResultHit;
