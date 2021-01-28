import { useQuery } from '@apollo/client';
import { SINGLE_PROPERTY_QUERY } from '@/Gql/queries';
import { PROPERTY_DETAILS_EDITABLE_DISPLAY_CONF } from '@/Lib/configs/editableDisplays/propertyDetails';
import EditableDisplayItems from '@/Components/EditableDisplay/EditableDisplayItems';
import CarouselSlider from '@/Components/CarouselSlider';

import Error from '@/Components/ErrorMessage';
import Loader from '@/Components/Loader';
import { Typography, Chip, Box } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

// displays
import {
  ChipItems,
  Money,
  Date,
  String,
  RichText,
  Title,
} from '@/Components/Displays';

// icons
import BathtubIcon from '@material-ui/icons/Bathtub';
import GroupIcon from '@material-ui/icons/Group';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import TodayIcon from '@material-ui/icons/Today';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MoneyIcon from '@material-ui/icons/Money';

const useStyles = makeStyles(theme => ({
  root: {
    // color: theme.palette.text.primary,
  },
  chipItems: {
    display: 'flex',
  },
  chip: {
    margin: theme.spacing(0, 1, 1, 0),
  },
}));

const PropertyPublicDetails = ({ id }) => {
  const classes = useStyles();
  const { data, loading, error } = useQuery(SINGLE_PROPERTY_QUERY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: id,
      },
    },
  });

  if (loading)
    return (
      <Loader loading={loading} text={`Loading Property data for ${id}`} />
    );

  if (error) return <Error error={error} />;

  if (!data)
    return (
      <Title variant="h4" spacing={2}>
        No Data for Property {id}
      </Title>
    );

  const { property } = data;

  const cSlides = data.property.images
    ? property.images.map((img, idx) => ({
        img: img.url,
        title: img.filename,
      }))
    : [];

  // title src

  return (
    <div className={classes.root}>
      <CarouselSlider slides={cSlides} height="420px" />
      <Title
        style={{ textAlign: 'left' }}
        value={property.location}
        variant="h4"
        gutterBottom
        spacing={2}
      />
      <Money
        title="Rent"
        icon={<MoneyIcon />}
        orientation="horizontal"
        reverse
        variant="body2"
        value={property.rent}
        valueProps={{ color: 'primary', variant: 'h5' }}
      />
      <String
        title="Rooms"
        icon={<HomeWorkIcon />}
        value={property.rooms}
        orientation="horizontal"
        reverse
        valueProps={{ color: 'secondary', variant: 'h6' }}
      />
      <String
        icon={<BathtubIcon />}
        title="bathrooms"
        value={property.bathrooms}
        orientation="horizontal"
        reverse
        valueProps={{ color: 'secondary', variant: 'h6' }}
      />
      <String
        title="Maximum Occupants"
        icon={<GroupIcon />}
        value={property.maximumOccupants}
        orientation="horizontal"
        reverse
        valueProps={{ color: 'secondary', variant: 'h6' }}
      />
      <Date
        title="Move in date"
        icon={<TodayIcon />}
        value={property.moveInDate}
        format="ShortDateTime"
        orientation="horizontal"
        reverse
        valueProps={{ color: 'secondary', variant: 'h6' }}
      />
      <RichText
        value={property.headline}
        orientation="horizontal"
        valueProps={{ color: 'secondary', variant: 'body1' }}
      />
      <String
        title="Title type"
        value={property.titleType}
        orientation="horizontal"
        valueProps={{ color: 'secondary', variant: 'h6' }}
      />
      <String
        title="Type"
        value={property.type}
        orientation="horizontal"
        valueProps={{ color: 'secondary', variant: 'h6' }}
      />
      <String
        title="Fixed Length"
        value={property.fixedLength}
        orientation="horizontal"
        valueProps={{ color: 'secondary', variant: 'h6' }}
      />

      <String
        title="tenancyType"
        value={property.tenancyType}
        orientation="horizontal"
        valueProps={{ color: 'secondary', variant: 'h6' }}
      />

      <String
        title="bondType"
        value={property.bondType}
        orientation="horizontal"
        valueProps={{ color: 'secondary', variant: 'h6' }}
      />

      <String
        title="garageSpaces"
        value={property.garageSpaces}
        orientation="horizontal"
        valueProps={{ color: 'secondary', variant: 'h6' }}
      />
      <String
        title="carportSpaces"
        value={property.carportSpaces}
        orientation="horizontal"
        valueProps={{ color: 'secondary', variant: 'h6' }}
      />
      <String
        title="offStreetSpaces"
        value={property.offStreetSpaces}
        orientation="horizontal"
        valueProps={{ color: 'secondary', variant: 'h6' }}
      />
      <ChipItems
        title="Chattels"
        titleProps={{
          variant: 'h6',
        }}
        items={property.chattels}
        variant="default"
        color="secondary"
      />
    </div>
  );
};

export default PropertyPublicDetails;
