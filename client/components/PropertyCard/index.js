import React, { Component, useState } from 'react';
import PropertyCard from '../../styles/PropertyCard';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Map from '../Map/index';
//icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import HomeIcon from '@material-ui/icons/Home';
import MoneyIcon from '@material-ui/icons/AttachMoney';
// tabs
import Tabs from '@material-ui/core/Tabs';
import Tab from '../../styles/Tab';
import TabContainer from '../TabContainer/index';
// tab components
import Details from './Details';
import Apply from './Apply';
import Rating from './Rating';
// custom highlight from search interface
import CustomHighlight from '../PropertySearch/refinements/CustomHiglight';

const PropertyCardComponent = props => {
  const [value, setValue] = useState(0);

  const handleChange = (event, value) => {
    setValue(value);
  };

  const { property } = props;
  const isSearch = props.isSearch ? props.isSearch : null;

  const {
    id,
    rooms,
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
  } = property;

  return (
    <PropertyCard raised={true}>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={'avatar'}>
            H
          </Avatar>
        }
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={
          isSearch ? (
            <CustomHighlight attribute={'location'} hit={property} />
          ) : (
            location
          )
        }
        subheader={
          <div style={{ display: 'flex' }}>
            <HomeIcon />
            {rooms}
            <MoneyIcon />
            {rent} = {Math.ceil(rent / rooms)} per person
          </div>
        }
      />
      {/* <CardMedia
        className={"media"}
        // image="/static/images/cards/paella.jpg"
        image={imageUrls.length > 0 ? imageUrls[0].url : null}
        title="Paella dish"
      /> */}
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Details" />
        <Tab label="Apply" />
        <Tab label="Rating" />
      </Tabs>
      {value === 0 && (
        <TabContainer>{<Details property={property} />}</TabContainer>
      )}
      {value === 1 && (
        <TabContainer>
          <Apply property={property} />
        </TabContainer>
      )}
      {value === 2 && <TabContainer>{<Rating />}</TabContainer>}
    </PropertyCard>
  );
};

export default PropertyCardComponent;
