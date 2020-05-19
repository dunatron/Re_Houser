import INSULATIONFORM_CONF from '../../lib/configs/insulationStatementForm';

const CREATE_PROPERTY_FORM_CONF = [
  {
    type: 'Header',
    key: 'TheHeader',
    fieldProps: {
      label: 'Create Property',
    },
  },
  {
    type: 'Section',
    fieldProps: {
      label: 'Location',
    },
    inners: [
      {
        type: 'Location',
        key: 'location',
        fieldProps: {
          name: 'location',
          label:
            'Lodation of property. SHould probs use google like normal property picker',
        },
        refConf: {
          required: {
            value: true,
            message: 'You need a location to appraise a property...',
          },
        },
      },
    ],
  },
  {
    type: 'Entity',
    key: 'insulationForm',
    resolveKey: 'insulationForm',
    required: false,
    title: 'Insualtion Statement',
    description:
      'You can complete the insulation form at a later time. It takes around 5-10 minutes to complete provided you have the data on hand',
    formConf: INSULATIONFORM_CONF,
    // Below is not true but cool to know it works like the dope flowing within my veins
    refConf: {
      required: {
        value: false, // set t false because its not required upon creation
        message: 'Insulation Statement form must  be supplied and submiitted',
      },
    },
  },
  {
    type: 'Section',
    fieldProps: {
      label: 'Details',
    },
    inners: [
      // { type: 'SelectMultipleEnum', fieldProps: { name: 'dsa' } },
      {
        type: 'SelectOneEnum',
        __type: 'PropertyType',
        key: 'type',
        fieldProps: {
          name: 'type',
          label: 'Property Type',
        },
        refConf: {
          required: {
            value: true,
            message: 'You need to supply a Type for a property',
          },
        },
      },
      {
        type: 'Int',
        key: 'rent',
        fieldProps: {
          name: 'rent',
          label: 'total rent',
        },
        refConf: {
          required: {
            value: true,
            message: 'You need to supply the total rent fro the property',
          },
        },
      },
      {
        type: 'Int',
        key: 'rooms',
        fieldProps: {
          name: 'rooms',
          label: 'rooms',
        },
        refConf: {
          required: {
            value: true,
            message:
              'You need to supply the number of rooms when creating a property',
          },
        },
      },
      {
        type: 'Int',
        key: 'bathrooms',
        fieldProps: {
          name: 'bathrooms',
          label: 'bathrooms',
        },
        refConf: {
          required: {
            value: true,
            message:
              'You need to supply the number of bathrooms when creating a property',
          },
        },
      },
    ],
  },
  {
    type: 'Section',
    fieldProps: {
      label: 'Parking Section',
    },
    inners: [
      {
        type: 'Int',
        key: 'garageSpaces',
        fieldProps: {
          name: 'garageSpaces',
          label: 'Garage Spaces',
        },
        refConf: {
          required: {
            value: true,
            message: 'You need to supply the number of garage spaces',
          },
        },
      },
      {
        type: 'Int',
        key: 'carportSpaces',
        fieldProps: {
          name: 'carportSpaces',
          label: 'Carport Spaces',
        },
        refConf: {
          required: {
            value: true,
            message: 'You need to supply the number of carport spaces',
          },
        },
      },
      {
        type: 'Int',
        key: 'offStreetSpaces',
        fieldProps: {
          name: 'offStreetSpaces',
          label: 'Offstreet spaces',
        },
        refConf: {
          required: {
            value: true,
            message: 'You need to supply the number of offstreet spaces',
          },
        },
      },
    ],
  },
  {
    type: 'Section',
    fieldProps: {
      label: 'Features Section',
    },
    inners: [
      {
        type: 'SelectMultipleEnum',
        __type: 'IndoorFeature',
        key: 'indoorFeatures',
        fieldProps: {
          name: 'indoorFeatures',
          label: 'Select indoor features',
        },
        refConf: {},
      },
      {
        type: 'SelectMultipleEnum',
        __type: 'OutdoorFeature',
        key: 'outdoorFeatures',
        fieldProps: {
          name: 'outdoorFeatures',
          label: 'Select outdoor features',
        },
        refConf: {},
      },
      {
        type: 'SelectMultipleEnum',
        __type: 'HeatSource',
        key: 'heatSources',
        fieldProps: {
          name: 'heatSources',
          label: 'select all valid heat source on propery',
        },
        refConf: {},
      },
    ],
  },
  {
    type: 'Section',
    fieldProps: {
      label: 'Dates Section',
    },
    inners: [
      {
        type: 'Date',
        __type: 'IndoorFeature',
        key: 'moveInDate',
        fieldProps: {
          name: 'moveInDate',
          label: 'Move in date',
        },
        refConf: {
          required: {
            value: true,
            message:
              'You need to supply a move in date. Indicating the earliest a potential tenant can move in',
          },
        },
      },
      {
        type: 'Date',
        key: 'expiryDate',
        fieldProps: {
          name: 'expiryDate',
          label: 'Move out date',
        },
        refConf: {},
      },
    ],
  },
  {
    type: 'File',
    key: 'images',
    fieldProps: {
      isMultiple: true,
      maxFilesAllowed: 5,
      name: 'images',
      label: 'Images',
      description: 'You need some images',
    },
    refConf: {
      required: {
        value: true,
        message: 'You need some images',
      },
    },
  },
];
export { CREATE_PROPERTY_FORM_CONF };
export default CREATE_PROPERTY_FORM_CONF;
