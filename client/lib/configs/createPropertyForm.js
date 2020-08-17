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
    type: 'Section',
    fieldProps: {
      label: 'Insulation statement',
    },
    inners: [
      {
        type: 'SelectOneEnum',
        __type: 'InsulationProof',
        key: 'insulationProof',
        exclude: true,
        fieldProps: {
          name: 'insulationProof',
          label: 'Select Insulation proof method',
        },
        refConf: {},
        inners: [
          {
            type: 'File',
            parentShowVals: ['FILE'],
            key: 'insulationStatementFile',
            fieldProps: {
              isMultiple: false,
              maxFilesAllowed: 1,
              name: 'insulationStatementFile',
              label: 'insulation statement file',
              description: 'You need to upload your insualtion statement',
            },
            refConf: {
              required: {
                value: true,
                message:
                  'You need to upload your insualtion statement when you have "FILE" selected for the insulation statement proof',
              },
            },
          },
          {
            type: 'Entity',
            parentShowVals: ['FORM'],
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
                message:
                  'Insulation Statement form must  be supplied and submiitted',
              },
            },
          },
          {
            type: 'Info',
            parentShowVals: ['REHOUSER'],
            content: `Rehouser will make sure you have an insulation statement`,
            refConf: {},
          },
        ],
      },
    ],
  },
  // {
  //   type: 'Section',
  //   fieldProps: {
  //     label: 'Insulation statement',
  //   },
  //   inners: [
  //     {
  //       type: 'SelectOneWithText',
  //       key: 'insulationProof',
  //       exclude: true,
  //       fieldProps: {
  //         name: 'insulationProof',
  //         label: 'Select Insulation proof method',
  //         options: [
  //           {
  //             label: 'file',
  //             name: 'file',
  //           },
  //           {
  //             label: 'form',
  //             name: 'form',
  //           },
  //           {
  //             label: 'rehouser',
  //             name: 'rehouser',
  //           },
  //         ],
  //       },
  //       refConf: {},
  //       inners: [
  //         {
  //           type: 'Info',
  //           // parentShowVals: ['file'],
  //           showOn: {
  //             key: 'insulationProof',
  //             values: ['file'],
  //           },
  //           content: `ToDo: add file upload`,
  //           refConf: {},
  //         },
  //         {
  //           type: 'Entity',
  //           key: 'insulationForm',
  //           showOn: {
  //             key: 'insulationProof',
  //             values: ['form'],
  //           },
  //           resolveKey: 'insulationForm',
  //           required: false,
  //           title: 'Insualtion Statement',
  //           description:
  //             'You can complete the insulation form at a later time. It takes around 5-10 minutes to complete provided you have the data on hand',
  //           formConf: INSULATIONFORM_CONF,
  //           // Below is not true but cool to know it works like the dope flowing within my veins
  //           refConf: {
  //             required: {
  //               value: false, // set t false because its not required upon creation
  //               message:
  //                 'Insulation Statement form must  be supplied and submiitted',
  //             },
  //           },
  //         },
  //         {
  //           type: 'Info',
  //           showOn: {
  //             key: 'insulationProof',
  //             values: ['rehouser'],
  //           },
  //           content: `ToDo: add boolean stating rehouser has to handle this`,
  //           refConf: {},
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    type: 'Section',
    fieldProps: {
      label: 'Details',
    },
    inners: [
      // { type: 'SelectMultipleEnum', fieldProps: { name: 'dsa' } },
      {
        type: 'BankAccount',
        key: 'bankDetails',
        fieldProps: {
          name: 'bankDetails',
          label: 'Bank account details',
          placeholder: 'BB-bbbb-AAAAAAA-SSS',
        },
        refConf: {
          required: {
            value: true,
            message:
              'You need to supply the bankAccNumber that we will pay out your profit too',
          },
        },
      },
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
            type: 'SelectOneEnum',
            __type: 'TenancyFixedLength',
            key: 'fixedLength',
            parentShowVals: ['FIXED'],
            fieldProps: {
              name: 'fixedLength',
              label: 'Fixed Length',
            },
            refConf: {
              required: {
                value: true,
                message:
                  'You need to specify an ending date when the tenancy type is FIXED',
              },
            },
          },
          // {
          //   type: 'Date',
          //   key: 'expiryDate',
          //   parentShowVals: ['FIXED'],
          //   fieldProps: {
          //     name: 'expiryDate',
          //     label: 'Move out date',
          //   },
          //   refConf: {
          //     required: {
          //       value: true,
          //       message:
          //         'You need to specify an ending date when the tenancy type is FIXED',
          //     },
          //   },
          // },
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
    type: 'File',
    key: 'images',
    fieldProps: {
      isMultiple: true,
      maxFilesAllowed: 5,
      name: 'images',
      label: 'Images',
      description:
        'It is not necessary to upload photos of your property as that will be completed by Rehouser.',
    },
    refConf: {},
  },
  {
    type: 'File',
    key: 'proofOfOwnership',
    fieldProps: {
      isMultiple: false,
      maxFilesAllowed: 1,
      name: 'proofOfOwnership',
      label: 'Proof of ownership',
      description: 'You need to upoad a file that proves you own the property',
    },
    refConf: {
      required: {
        value: true,
        message: 'You need to upoad a file that proves you own the property',
      },
    },
  },
  {
    type: 'Section',
    fieldProps: {
      label: 'Some Section',
    },
    inners: [
      {
        type: 'String',
        key: 'manholeLocation',
        fieldProps: {
          name: 'manholeLocation',
          label: 'Where is the manhole located',
          multiline: true,
          rows: 1,
          rowsMax: 5,
        },
        refConf: {
          required: {
            value: true,
            message: `You need to tell us where the manhole is located even if your answer is "I don't know"`,
          },
        },
      },
      {
        type: 'CheckReason',
        key: 'gardenToMaintain',
        fieldProps: {
          name: 'gardenToMaintain',
          label: 'Is there a garden to maintain',
          defaultValue: 'Test',
        },
        refConf: {
          required: {
            value: true,
            message: 'You must specify if there is a garden to maintain or not',
          },
        },
        inners: [
          {
            type: 'SelectOneEnum',
            __type: 'PartyResponsible',
            key: 'gardenResponsible',
            parentShowVals: ['Yes'],
            fieldProps: {
              name: 'gardenResponsible',
              label: 'Who is responsible for the garden',
            },
            refConf: {
              required: {
                value: true,
                message:
                  'You need to tell us who will be responsible for managing the garden',
              },
            },
          },
        ],
      },
      // {
      //   type: 'SelectOneEnum',
      //   __type: 'PartyResponsible',
      //   key: 'gardenResponsible',
      //   exclude: true,
      //   fieldProps: {
      //     name: 'gardenResponsible',
      //     label: 'Who is responsible for the garden',
      //   },
      //   refConf: {},
      // },
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
      label: 'Healthy Homes Standard',
    },
    inners: [
      {
        type: 'File',
        key: 'healthyHome.codeComplianceCert',
        fieldProps: {
          isMultiple: false,
          maxFilesAllowed: 1,
          name: 'healthyHome.codeComplianceCert',
          label: 'Code Compliance Certificate',
          description: 'Code compliance certificate',
        },
        refConf: {},
      },
      {
        type: 'File',
        key: 'healthyHome.certOfAcceptance',
        fieldProps: {
          isMultiple: false,
          maxFilesAllowed: 1,
          name: 'healthyHome.certOfAcceptance',
          label: 'Certificate of acceptance',
          description: 'Certificate of acceptance',
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
    type: 'Section',
    fieldProps: {
      label: 'Assistance',
    },
    inners: [
      {
        type: 'Boolean',
        key: 'rehouserAssist.rates',
        fieldProps: {
          name: 'rehouserAssist.rates',
          label: 'Rates',
        },
        refConf: {},
      },
      {
        type: 'Boolean',
        key: 'rehouserAssist.water',
        fieldProps: {
          name: 'rehouserAssist.water',
          label: 'Water',
        },
        refConf: {},
      },
      {
        type: 'Boolean',
        key: 'rehouserAssist.insurance',
        fieldProps: {
          name: 'rehouserAssist.insurance',
          label: 'Insurance',
        },
        refConf: {},
      },
    ],
  },
];
export { CREATE_PROPERTY_FORM_CONF };
export default CREATE_PROPERTY_FORM_CONF;
