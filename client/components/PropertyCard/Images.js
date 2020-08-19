import React, { Component, useState } from 'react';
import {
  CardContent,
  IconButton,
  Button,
  Typography,
  CardActions,
  Collapse,
} from '@material-ui/core';
import CarouselSlider from '../CarouselSlider';
import CameraIcon from '../../styles/icons/CameraIcon';
import MapIcon from '@material-ui/icons/Map';
import DetailItem from './DetailItem';
import moment from 'moment';

import Map from '../Map/index';

//icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {},
  detailsGrid: {
    display: 'grid',
    gridGap: '8px',
    width: '100%',
    padding: '0',
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr 1fr',
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 1fr 1fr ',
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
    },
  },
}));

const Details = props => {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const {
    type,
    rooms,
    accommodation,
    rent,
    moveInDate,
    onTheMarket,
    location,
    locationLat,
    locationLng,
    owners,
    creator,
    images,
    imageUrls, // for algolia
    carportSpaces,
    garageSpaces,
    offStreetSpaces,
    outdoorFeatures,
    indoorFeatures,
  } = props.property;
  return (
    <div className={classes.root}>
      <CarouselSlider slides={imageUrls.map(imgUrl => ({ img: imgUrl }))} />
      <CardActions className={'actions'} disableSpacing={true}>
        <IconButton aria-label="Share">
          <ShareIcon />
        </IconButton>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show more">
          <MapIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Map
            center={{
              lat: locationLat,
              lng: locationLng,
            }}
            zoom={15}
          />
        </CardContent>
      </Collapse>
    </div>
  );
};

export default Details;
