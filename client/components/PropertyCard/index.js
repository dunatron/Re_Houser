import PropTypes from 'prop-types';
import React, { Component, useState } from 'react';
import PropertyCard from '@/Styles/PropertyCard';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Map from '@/Components/Map/index';
//icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import HomeIcon from '@material-ui/icons/Home';
import MoneyIcon from '@material-ui/icons/AttachMoney';

// tabs
import Tabs from '@material-ui/core/Tabs';
import Tab from '@/Styles/Tab';
import TabContainer from '@/Components/TabContainer/index';
// gql details component
import ExtraDetails from './ExtraDetails';
// tab components
import ImagesComponent from './Images';
import Apply from './Apply';
import Rating from './Rating';
// custom highlight from search interface
import CustomHighlight from '@/Components/PropertySearch/refinements/CustomHiglight';

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
      <ExtraDetails property={property} />
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        centered>
        <Tab label="Images" />
        <Tab label="Apply" />
        <Tab label="Rating" />
      </Tabs>
      {value === 0 && (
        <TabContainer>{<ImagesComponent property={property} />}</TabContainer>
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

PropertyCardComponent.propTypes = {
  isSearch: PropTypes.any.isRequired,
  property: PropTypes.any.isRequired,
};

export default PropertyCardComponent;
