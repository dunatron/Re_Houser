import INSULATIONFORM_CONF from '../../lib/configs/insulationStatementForm';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';

const CREATE_PROPERTY_FORM_CONF = [
  // {
  //   type: 'Header',
  //   key: 'TheHeader',
  //   fieldProps: {
  //     label: 'Create Property',
  //   },
  // },
  {
    type: 'Section',
    fieldProps: {
      label: 'Location',
    },
    inners: [
      // {
      //   type: 'Location',
      //   key: 'location',
      //   fieldProps: {
      //     name: 'location',
      //     label:
      //       'Lodation of property. SHould probs use google like normal property picker',
      //   },
      //   refConf: {
      //     required: {
      //       value: true,
      //       message: 'You need a location to appraise a property...',
      //     },
      //   },
      // },
      {
        type: 'Location',
        key: 'location',
        fieldProps: {
          name: 'location',
          fieldMaps: {
            placeId: 'placeId',
            desc: 'location',
            lat: 'locationLat',
            lng: 'locationLng',
          },
          label: 'Property Location',
        },
        refConf: {
          required: {
            value: true,
            message: 'You to supply the property location',
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
        type: 'SelectOneEnum',
        __type: 'TenancyType',
        key: 'tenancyType',
        fieldProps: {
          name: 'tenancyType',
          label: 'Tenancy Type',
        },
        refConf: {
          required: {
            value: true,
            message: 'You need to supply a Tenancy Type for a property',
          },
        },
        inners: [
          {
            type: 'Info',
            parentShowVals: ['PERIODIC'],
            content: `This is a periodic tenancy and may be ended by either
            party giving notice as required under the Residential Tenancies Act 1986`,
            refConf: {},
          },
          {
            type: 'Date',
            key: 'expiryDate',
            parentShowVals: ['FIXED'],
            fieldProps: {
              name: 'expiryDate',
              label: 'Move out date',
            },
            refConf: {
              required: {
                value: true,
                message:
                  'You need to specify an ending date when the tenancy type is FIXED',
              },
            },
          },
        ],
      },
      // tenancyType
      {
        type: 'Money',
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
          InputProps: { inputProps: { min: 0 } },
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
        key: 'maximumOccupants',
        fieldProps: {
          name: 'maximumOccupants',
          label: 'Maximum occupants',
          InputProps: { inputProps: { min: 1 } },
        },
        refConf: {
          required: {
            value: true,
            message:
              'You need to specify the maximum amount of occupants that can reside on the property while leases',
          },
        },
      },
      {
        type: 'Int',
        key: 'bathrooms',
        fieldProps: {
          name: 'bathrooms',
          label: 'bathrooms',
          InputProps: { inputProps: { min: 0 } },
        },
        refConf: {
          required: {
            value: true,
            message:
              'You need to supply the number of bathrooms when creating a property',
          },
        },
      },
      {
        type: 'SelectMultipleEnum',
        __type: 'PropertyChattel',
        key: 'chattels',
        fieldProps: {
          name: 'chattels',
          label: 'Select property chattels',
        },
        refConf: {},
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
          InputProps: { inputProps: { min: 0 } },
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
          InputProps: { inputProps: { min: 0 } },
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
          InputProps: { inputProps: { min: 0 } },
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
          label: 'select heat sources',
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
        key: 'moveInDate',
        fieldProps: {
          name: 'moveInDate',
          label: 'Available from date',
        },
        refConf: {
          required: {
            value: true,
            message:
              'You need to supply an available from. Indicating the earliest a potential tenant can move in',
          },
        },
      },
    ],
  },
  {
    type: 'Section',
    fieldProps: {
      label: 'Pets',
    },
    inners: [
      {
        type: 'CheckReason',
        key: 'petsAllowed',
        fieldProps: {
          name: 'petsAllowed',
          label: 'Are pets allowed',
          defaultValue: 'Test',
        },
        refConf: {
          required: {
            value: true,
            message: 'You must specify if pets are allowed or not',
          },
        },
        inners: [
          {
            type: 'SelectMultipleEnum',
            __type: 'Pet',
            key: 'pets',
            parentShowVals: ['Yes'],
            fieldProps: {
              name: 'pets',
              label: 'Select pets allowed',
            },
            refConf: {},
          },
        ],
      },
    ],
  },
  {
    type: 'Section',
    fieldProps: {
      label: 'Smoke alarm section',
    },
    inners: [
      {
        type: 'Boolean',
        key: 'workingAlarms',
        fieldProps: {
          name: 'workingAlarms',
          label: 'Working smoke alarms',
        },
        refConf: {},
      },
      {
        type: 'Boolean',
        key: 'inHallway3mOfEachBedroom',
        fieldProps: {
          name: 'inHallway3mOfEachBedroom',
          label: 'In hallway within 3m of each bedroom',
        },
        refConf: {},
      },
      {
        type: 'Boolean',
        key: 'tenYearPhotoelectricAlarms',
        fieldProps: {
          name: 'tenYearPhotoelectricAlarms',
          label: '10 year photelectric alarms',
        },
        refConf: {},
      },
      {
        type: 'Boolean',
        key: 'alarmsEachLevel',
        fieldProps: {
          name: 'alarmsEachLevel',
          label: 'Alarms each level if multi level',
        },
        refConf: {},
      },
    ],
  },
  {
    type: 'Section',
    fieldProps: {
      label: 'Cover',
    },
    inners: [
      {
        type: 'Boolean',
        key: 'landlordProtectionCover',
        fieldProps: {
          name: 'landlordProtectionCover',
          label: 'landord protection cover',
        },
        refConf: {},
      },
      {
        type: 'Boolean',
        key: 'freeGlassCover',
        fieldProps: {
          name: 'freeGlassCover',
          label: 'Free glass cover',
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
