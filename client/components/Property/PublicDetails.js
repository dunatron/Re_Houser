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
} from '@/Components/Displays';

// icons
import BathtubIcon from '@material-ui/icons/Bathtub';

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
// placeId: String! @unique
// location: String!
// locationLat: Float!
// locationLng: Float!
// titleType: PropertyTitleType!
// type: PropertyType
// fixedLength: TenancyFixedLength
// headline: String
// rooms: Int!
// maximumOccupants: Int
// rent: Float!
// tenancyType: TenancyType
// bondType: BondType @default(value: WEEKS_RENT_2)
// bathrooms: Int
// garageSpaces: Int!
// carportSpaces: Int!
// offStreetSpaces: Int!
// insulationProof: InsulationProof
// insulationForm: InsulationForm
// insulationStatementFile: File
// @relation(name: "InsualtionStatementFile", link: TABLE)
// indoorFeatures: [IndoorFeature] @scalarList(strategy: RELATION)
// outdoorFeatures: [OutdoorFeature] @scalarList(strategy: RELATION)
// heatSources: [HeatSource] @scalarList(strategy: RELATION)
// moveInDate: DateTime
// agents: [User!]! @relation(name: "PropertyAgents")
// images: [File!]! @relation(name: "PropertyImages", link: TABLE)
// # floorPlans: File
// rehouserStamp: Boolean)
// petsAllowed: Boolean
// pets: [Pet] @scalarList(strategy: RELATION)
// chattels: [PropertyChattel] @scalarList(strategy: RELATION)
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

  if (!data) return <Typography>No Data for Property {id}</Typography>;

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
      <Typography variant="h3" gutterBottom>
        {property.location}
      </Typography>
      <RichText
        value={property.headline}
        orientation="horizontal"
        valueProps={{ color: 'secondary', variant: 'body1' }}
      />
      <Money
        title="Rent"
        orientation="horizontal"
        variant="body2"
        value={property.rent}
        valueProps={{ color: 'primary', variant: 'h5' }}
      />
      <Date
        title="Move in date"
        value={property.moveInDate}
        format="ShortDateTime"
        orientation="horizontal"
        valueProps={{ color: 'secondary', variant: 'h6' }}
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
        title="Rooms"
        value={property.rooms}
        orientation="horizontal"
        valueProps={{ color: 'secondary', variant: 'h6' }}
      />
      <String
        title="Maximum Occupants"
        value={property.maximumOccupants}
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
        icon={<BathtubIcon />}
        title="bathrooms"
        value={property.bathrooms}
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
      {/* <EditableDisplayItems
        __typename="Property"
        disableEdit={true}
        data={{
          ...data.property,
        }}
        items={PROPERTY_DETAILS_EDITABLE_DISPLAY_CONF}
        where={{ id: id }}
      /> */}
    </div>
  );
};

export default PropertyPublicDetails;
