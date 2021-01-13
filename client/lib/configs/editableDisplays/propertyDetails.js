// accommodation: [Accommodation!]! @relation(name: "PropertyAccommodation")
// bankDetails: BankDetail @relation(name: "PropertyBankDetails", link: TABLE)
// insulationForm: InsulationForm
// owners: [User!]! @relation(name: "PropertyOwner")
// agents: [User!]! @relation(name: "PropertyAgents")
// creator: User! @relation(name: "PropertyCreator")
// images: [File!]! @relation(name: "PropertyImages", link: TABLE)
// rentalApplications: [RentalApplication] @relation(name: "PropertyRentalApplication")
// leases: [PropertyLease] @relation(name: "PropertyLeases")
// activity: [Activity!]! @relation(name: "PropertyActivity")
// appraisals: [RentalAppraisal] @relation(name: "PropertyRentalAppraisals")
// viewings: [Viewing] @relation(name: "PropertyViewings")
// rehouserAssist: PropertyAssist @relation(name: "PropertyAssists", link: TABLE)
// inspections: [Inspection] @relation(name: "PropertyInspections", link: TABLE)
const PROPERTY_DETAILS_EDITABLE_DISPLAY_CONF = [
  {
    type: 'String',
    key: 'id',
    label: 'ID',
    editable: false,
    fieldProps: {},
  },
  {
    type: 'String',
    key: 'location',
    label: 'Location',
    editable: false,
    fieldProps: {},
  },
  {
    type: 'DateTime',
    key: 'createdAt',
    label: 'Created At',
    editable: false,
    fieldProps: {},
  },
  {
    type: 'DateTime',
    key: 'updatedAt',
    label: 'Updated At',
    editable: false,
    fieldProps: {},
  },
  {
    type: 'SelectOneEnum',
    __type: 'PropertyTitleType',
    key: 'titleType',
    label: 'Title Type',
    editable: true,
    fieldProps: {},
  },
  {
    type: 'BankAccount',
    __typename: 'BankDetail',
    key: 'bankDetails',
    label: 'Bank Details',
    fieldProps: {},
  },
  {
    type: 'SelectOneEnum',
    key: 'type',
    __type: 'PropertyType',
    label: 'Type',
    fieldProps: {},
  },
  {
    type: 'SelectOneEnum',
    key: 'fixedLength',
    __type: 'TenancyFixedLength',
    label: 'Tenancy Fixed Length',
    fieldProps: {},
  },
  {
    type: 'String',
    key: 'headline',
    label: 'Headline',
    fieldProps: {},
  },
  {
    type: 'Int',
    key: 'maximumOccupants',
    label: 'maximumOccupants',
    fieldProps: {},
  },
  {
    type: 'Money',
    key: 'rent',
    label: 'Rent',
    fieldProps: {},
  },
  {
    type: 'String',
    key: 'headline',
    label: 'Headline',
    fieldProps: {},
  },
  {
    type: 'SelectOneEnum',
    key: 'bondType',
    __type: 'BondType',
    label: 'Bond Type',
    fieldProps: {},
  },
  {
    type: 'Money',
    key: 'lowestRoomPrice',
    label: 'lowestRoomPrice',
    fieldProps: {},
  },
  {
    type: 'Money',
    key: 'highestRoomPrice',
    label: 'highestRoomPrice',
    fieldProps: {
      variant: 'standard',
    },
  },
  {
    type: 'Boolean',
    key: 'useAdvancedRent',
    label: 'useAdvancedRent',
    fieldProps: {},
  },
  {
    type: 'Int',
    key: 'bathrooms',
    label: 'bathrooms',
    fieldProps: {},
  },
  {
    type: 'Int',
    key: 'garageSpaces',
    label: 'garageSpaces',
    fieldProps: {},
  },
  {
    type: 'Int',
    key: 'carportSpaces',
    label: 'carportSpaces',
    fieldProps: {},
  },
  {
    type: 'Int',
    key: 'offStreetSpaces',
    label: 'offStreetSpaces',
    fieldProps: {},
  },
  {
    type: 'SelectOneEnum',
    __type: 'InsulationProof',
    key: 'insulationProof',
    label: 'insulationProof',
    fieldProps: {},
  },
  // {
  //   type: 'File',
  //   key: 'insulationStatementFile',
  //   label: 'insulationStatementFile',
  //   fieldProps: {},
  // },
  {
    type: 'SelectMultipleEnum',
    __type: 'IndoorFeature',
    key: 'indoorFeatures',
    label: 'indoorFeatures',
    fieldProps: {},
  },
  {
    type: 'SelectMultipleEnum',
    __type: 'OutdoorFeature',
    key: 'outdoorFeatures',
    label: 'outdoorFeatures',
    fieldProps: {},
  },
  {
    type: 'SelectMultipleEnum',
    __type: 'HeatSource',
    key: 'heatSources',
    label: 'heatSources',
    fieldProps: {},
  },
  {
    type: 'SelectMultipleEnum',
    __type: 'HeatSource',
    key: 'heatSources',
    label: 'heatSources',
    fieldProps: {},
  },
  {
    type: 'DateTime',
    key: 'moveInDate',
    label: 'moveInDate',
    fieldProps: {},
  },
  {
    type: 'DateTime',
    key: 'expiryDate',
    label: 'expiryDate',
    fieldProps: {},
  },
  {
    type: 'Int',
    key: 'leaseLengthInMonths',
    label: 'leaseLengthInMonths',
    fieldProps: {},
  },
  {
    type: 'Boolean',
    key: 'onTheMarket',
    label: 'onTheMarket',
    fieldProps: {},
  },
  // {
  //   type: 'File',
  //   key: 'proofOfOwnership',
  //   label: 'proofOfOwnership',
  //   fieldProps: {},
  // },
  {
    type: 'Boolean',
    key: 'acceptedTerms',
    label: 'acceptedTerms',
    fieldProps: {},
  },
  {
    type: 'Boolean',
    key: 'isLeased',
    label: 'isLeased',
    fieldProps: {},
  },
  {
    type: 'String',
    key: 'lastLeaseId',
    label: 'lastLeaseId',
    fieldProps: {},
  },
  {
    type: 'Date',
    key: 'leaseExpiryDate',
    label: 'leaseExpiryDate',
    fieldProps: {},
  },
  {
    type: 'Boolean',
    key: 'rehouserStamp',
    label: 'rehouserStamp',
    fieldProps: {},
  },
  {
    type: 'Boolean',
    key: 'petsAllowed',
    label: 'petsAllowed',
    fieldProps: {},
  },
  {
    type: 'String',
    key: 'manholeLocation',
    label: 'manholeLocation',
    fieldProps: {},
  },
  {
    type: 'Boolean',
    key: 'gardenToMaintain',
    label: 'gardenToMaintain',
    fieldProps: {},
  },
  {
    type: 'SelectOneEnum',
    __type: 'PartyResponsible',
    key: 'gardenResponsible',
    label: 'gardenResponsible',
    fieldProps: {},
  },
  {
    type: 'SelectOneEnum',
    __type: 'PartyResponsible',
    key: 'maintenanceResponsible',
    label: 'maintenanceResponsible',
    fieldProps: {},
  },
  {
    type: 'SelectMultipleEnum',
    key: 'chattels',
    label: 'chattels',
    fieldProps: {},
  },
  {
    type: 'Boolean',
    key: 'landlordProtectionCover',
    label: 'landlordProtectionCover',
    fieldProps: {},
  },
  {
    type: 'Boolean',
    key: 'freeGlassCover',
    label: 'freeGlassCover',
    fieldProps: {},
  },
  {
    type: 'Boolean',
    key: 'workingAlarms',
    label: 'workingAlarms',
    fieldProps: {},
  },
  {
    type: 'Boolean',
    key: 'inHallway3mOfEachBedroom',
    label: 'inHallway3mOfEachBedroom',
    fieldProps: {},
  },
  {
    type: 'Boolean',
    key: 'tenYearPhotoelectricAlarms',
    label: 'tenYearPhotoelectricAlarms',
    fieldProps: {},
  },
  {
    type: 'Boolean',
    key: 'alarmsEachLevel',
    label: 'alarmsEachLevel',
    fieldProps: {},
  },
  {
    type: 'Boolean',
    key: 'rehouserHandlesBills',
    label: 'rehouserHandlesBills',
    fieldProps: {},
  },
  // {
  //   type: 'File',
  //   key: 'files',
  //   label: 'files',
  //   fieldProps: {},
  // },
  {
    type: 'SelectOneEnum',
    __type: 'InspectionFrequency',
    key: 'inspectionFrequency',
    label: 'inspectionFrequency',
    fieldProps: {},
  },
  {
    type: 'Boolean',
    key: 'rehouserManaged',
    label: 'rehouserManaged',
    fieldProps: {},
  },
];
export default PROPERTY_DETAILS_EDITABLE_DISPLAY_CONF;