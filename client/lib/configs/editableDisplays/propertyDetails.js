const PROPERTY_DETAILS_EDITABLE_DISPLAY_CONF = [
  {
    type: 'String',
    key: 'id',
    label: 'ID',
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
    type: 'BankAccount',
    key: 'bankDetails',
    label: 'Bank Details',
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
    type: 'Money',
    key: 'rent',
    label: 'Rent',
    fieldProps: {},
  },
  {
    type: 'Boolean',
    key: 'useAdvancedRent',
    label: 'Use Advanced Rent',
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
    type: 'SelectMultipleEnum',
    key: 'heatSources',
    __type: 'PropertyType',
    label: 'Heat Sources',
    fieldProps: {},
  },
  {
    type: 'Int',
    __typename: 'Property',
    key: 'rooms',
    label: 'Rooms',
    fieldProps: {},
  },
];
export default PROPERTY_DETAILS_EDITABLE_DISPLAY_CONF;
