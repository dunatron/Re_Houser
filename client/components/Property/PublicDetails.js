import { useQuery } from '@apollo/client';
import { SINGLE_PROPERTY_QUERY } from '@/Gql/queries';
import { PROPERTY_DETAILS_EDITABLE_DISPLAY_CONF } from '@/Lib/configs/editableDisplays/propertyDetails';
import EditableDisplayItems from '@/Components/EditableDisplay/EditableDisplayItems';
import SlickCarousel from '@/Components/SlickCarousel/index';

import Error from '@/Components/ErrorMessage';
import Loader from '@/Components/Loader';
import { Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    // color: theme.palette.text.primary,
  },
}));
// id: ID! @unique @id # google placesId is too looong look below
// placeId: String! @unique
// location: String!
// locationLat: Float!
// locationLng: Float!
// titleType: PropertyTitleType!
// updatedAt: DateTime! @updatedAt
// createdAt: DateTime! @createdAt
// bankDetails: BankDetail @relation(name: "PropertyBankDetails", link: TABLE)
// type: PropertyType
// fixedLength: TenancyFixedLength
// headline: String
// rooms: Int!
// maximumOccupants: Int
// rent: Float!
// tenancyType: TenancyType
// bondType: BondType @default(value: WEEKS_RENT_2)
// lowestRoomPrice: Float
// highestRoomPrice: Float
// useAdvancedRent: Boolean @default(value: false)
// accommodation: [Accommodation!]! @relation(name: "PropertyAccommodation")
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
// expiryDate: DateTime
// leaseLengthInMonths: Int
// onTheMarket: Boolean! @default(value: false)
// owners: [User!]! @relation(name: "PropertyOwner")
// agents: [User!]! @relation(name: "PropertyAgents")
// creator: User! @relation(name: "PropertyCreator")
// images: [File!]! @relation(name: "PropertyImages", link: TABLE)
// proofOfOwnership: File @relation(name: "ProofOfOwnership", link: TABLE)
// acceptedTerms: Boolean @default(value: false)
// # floorPlans: File
// rentalApplications: [RentalApplication]
// @relation(name: "PropertyRentalApplication")
// leases: [PropertyLease] @relation(name: "PropertyLeases")
// isLeased: Boolean @default(value: false)
// lastLeaseId: String
// leaseExpiryDate: DateTime
// rehouserStamp: Boolean
// activity: [Activity!]! @relation(name: "PropertyActivity")
// appraisals: [RentalAppraisal] @relation(name: "PropertyRentalAppraisals")
// petsAllowed: Boolean
// pets: [Pet] @scalarList(strategy: RELATION)
// manholeLocation: String
// gardenToMaintain: Boolean @default(value: false)
// gardenResponsible: PartyResponsible
// maintenanceResponsible: PartyResponsible
// chattels: [PropertyChattel] @scalarList(strategy: RELATION)
// landlordProtectionCover: Boolean @default(value: false)
// freeGlassCover: Boolean @default(value: false)
// workingAlarms: Boolean @default(value: false)
// inHallway3mOfEachBedroom: Boolean @default(value: false)
// tenYearPhotoelectricAlarms: Boolean @default(value: false)
// alarmsEachLevel: Boolean @default(value: false)
// viewings: [Viewing] @relation(name: "PropertyViewings")
// files: PropertyFiles @relation(name: "PropertyFiles", link: TABLE)
// inspectionFrequency: InspectionFrequency
// inspections: [Inspection] @relation(name: "PropertyInspections", link: TABLE)
// rehouserHandlesBills: Boolean @default(value: false)
// rehouserAssist: PropertyAssist @relation(name: "PropertyAssists", link: TABLE)
// rehouserManaged: Boolean @default(value: true)
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

  const slides = data.property.images
    ? data.property.images.map((img, idx) => ({
        src: img.url,
        alt: img.filename,
      }))
    : [];

  return (
    <div className={classes.root}>
      Property Public Details
      <SlickCarousel slides={slides} />
      <EditableDisplayItems
        __typename="Property"
        disableEdit={true}
        data={{
          ...data.property,
        }}
        items={PROPERTY_DETAILS_EDITABLE_DISPLAY_CONF}
        where={{ id: id }}
      />
    </div>
  );
};

export default PropertyPublicDetails;
