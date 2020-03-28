import moment from 'moment';
const FIELDS_CONFIG = [
  {
    type: 'Header',
    fieldProps: {
      label: 'INSULATION STATEMENT FORM',
    },
  },
  {
    type: 'Subheader',
    fieldProps: {
      label:
        'Landlords must complete the insulation statement for a property before it can go on the market',
    },
  },
  {
    type: 'CheckReason',
    fieldProps: {
      name: 'meetsMinCeilingReq',
      label:
        'Does insulation meet the minimum requirements for ceiling insulation?',
      defaultValue: 'Test',
    },
    refConf: {
      required: {
        value: true,
        message:
          'You must select an option for mmeeting minnimum ceiling requirements',
      },
    },
    inners: [
      {
        type: 'String',
        fieldProps: {
          name: 'meetsMinCeilingReqReason',
          label:
            'Explain what exception applies and which room(s) it applies to.',
          placeholder:
            '(e.g. professional installer cannot access skillion ceiling above bedroom 2)',
          multiline: true,
          rowsMax: 6,
          margin: 'dense',
          style: {
            marginTop: 0,
          },
        },
        refConf: {
          required: {
            value: true,
            message: 'You must have a reson when selecting no',
          },
        },
      },
    ],
  },
  {
    type: 'CheckReason',
    fieldProps: {
      name: 'meetsMinUnderfloorReq',
      label:
        'Does insulation meet the minimum requirements for underfloor insulation?',
      defaultValue: 'Test',
    },
    refConf: {
      required: {
        value: true,
        message:
          'You must Yes or No for meeting minimum underfloor requirements',
      },
    },
    inners: [
      {
        type: 'String',
        fieldProps: {
          name: 'meetsMinUnderfloorReqReason',
          label:
            ' explain what exception applies and which room(s) it applies to',
          placeholder:
            '(e.g. professional installer cannot access subfloor space safely)',
          multiline: true,
          rowsMax: 6,
          margin: 'dense',
          style: {
            marginTop: 0,
          },
        },
        refConf: {
          required: {
            value: true,
            message:
              'You must supply a reason when selecting no for meeting minimum underfloor requirements',
          },
        },
      },
    ],
  },
  {
    type: 'Subheader',
    fieldProps: {
      label: 'Ceiling/Insulation',
    },
  },
  {
    type: 'SelectOneWithText',
    fieldProps: {
      name: 'ceilingCoverage',
      label: 'Location/Coverage?',
      options: [
        {
          name: 'COMPLETE',
          label: 'Complete (all rooms)',
        },
        {
          name: 'PARTIAL',
          label: 'Partial (specify areas not insulated)',
        },
        {
          name: 'NONE',
          label: 'None',
        },
        {
          name: 'UNKNOWN',
          label:
            'I don’t know as ceiling space is not accessible in the following areas (specify)',
        },
      ],
    },
    refConf: {
      required: {
        value: true,
        message: 'Ceiling Coverage must be specified',
      },
    },
    inners: [
      {
        type: 'String',
        showOn: {
          key: 'ceilingCoverage',
          values: ['PARTIAL', 'UNKNOWN'],
        },
        fieldProps: {
          name: 'ceilingCoverageReason',
          label: '(specify):',
          placeholder: '',
          multiline: true,
          rowsMax: 6,
          margin: 'dense',
          style: {
            marginTop: 0,
          },
        },
        refConf: {
          required: {
            value: true,
            message:
              'Please provide details for your ceiling coverage location choice',
          },
        },
      },
    ],
  },
  {
    type: 'CheckMultipleWithText',
    fieldProps: {
      name: 'ceilingTypes',
      label: 'Type',
      options: [
        {
          name: 'SEGMENTS_BLANKETS',
          label: 'Segments/Blankets',
        },
        {
          name: 'LOOSE_FILL',
          label: 'Loose-fill',
        },
        {
          name: 'OTHER',
          label: 'Other (specify)',
        },
        {
          name: 'NOT_ACCESSIBLE',
          label: 'ceiling space is not accessible',
        },
      ],
    },
    refConf: {
      required: {
        value: true,
        message: 'Celiling type must have at least one option checked',
      },
    },
    inners: [
      {
        type: 'String',
        showOn: {
          key: 'ceilingTypes',
          values: ['OTHER'],
        },
        fieldProps: {
          name: 'ceilingTypesOther',
          label: '(specify):',
          placeholder: '',
          multiline: true,
          rowsMax: 6,
          margin: 'dense',
          style: {
            marginTop: 0,
          },
        },
        refConf: {
          required: {
            value: true,
            message:
              'Celiling type must have a description when other is checked',
          },
        },
      },
    ],
  },
  {
    type: 'String',
    fieldProps: {
      name: 'ceilingBulkRValue',
      label: 'Bulk Insulation value (R-value)',
    },
    refConf: {
      required: {
        value: true,
        message: 'Celiling type must have at least one option checked',
      },
    },
  },
  {
    type: 'String',
    fieldProps: {
      name: 'ceilingMinimumThickness',
      label: 'Or minimum thickness',
    },
    refConf: {
      required: {
        value: true,
        message: 'Celiling type must have at least one option checked',
      },
    },
  },
  {
    type: 'DateTime',
    fieldProps: {
      name: 'ceilingInsulationInstallDate',
      // type: 'datetime-local',
      type: 'date',
      label: 'Date insulation was installed',
      // defaultValue: moment().format('YYYY-MM-DDTkk:mm'),
      // defaultValue: moment().format('YYYY-MM-DD'),
    },
    refConf: {
      required: {
        value: true,
        message: 'Celiling type must have at least one option checked',
      },
    },
  },
  {
    type: 'CheckMultipleWithText',
    fieldProps: {
      name: 'ceilingConditions',
      label: 'Condition',
      options: [
        {
          name: 'REASONABLE',
          label: 'Insulation is in at least a reasonable condition',
        },
        {
          name: 'NOT_REASONABLE',
          label: 'Insulation not in a reasonable condition',
        },
        {
          name: 'NO_GAPS',
          label:
            'Insulation has no gaps other than clearances where required (e.g. around older style downlights and chimney flues)',
        },
        {
          name: 'NOT_ACCESSIBLE',
          label: 'Ceiling space is not accessible',
        },
      ],
    },
    refConf: {
      required: {
        value: true,
        message: 'Celiling type must have at least one option checked',
      },
    },
    inners: [
      {
        type: 'String',
        showOn: {
          key: 'ceilingTypes',
          values: ['NOT_REASONABLE'],
        },
        fieldProps: {
          name: 'ceilingConditionReason',
          label: '(specify):',
          placeholder: '',
          multiline: true,
          rowsMax: 6,
          margin: 'dense',
          style: {
            marginTop: 0,
          },
        },
        refConf: {
          required: {
            value: true,
            message:
              'You must explain why ceiling insualtion is not in a resoanable condition',
          },
        },
      },
    ],
  },
  {
    type: 'Subheader',
    fieldProps: {
      label: 'Underfloor Insulation',
    },
  },
  {
    type: 'SelectOneWithText',
    fieldProps: {
      name: 'underfloorCoverage',
      label: 'Location/coverage',
      options: [
        {
          name: 'COMPLETE',
          label: 'Complete (all rooms)',
        },
        {
          name: 'PARTIAL',
          label: 'Partial (specify areas not insulated)',
        },
        {
          name: 'NONE',
          label: 'None',
        },
        {
          name: 'UNKNOWN',
          label:
            'I don’t know as underfloor space is not accessible in the following areas',
        },
      ],
    },
    refConf: {
      required: {
        value: true,
        message: 'underfloor coverage must have an option selected',
      },
    },
    inners: [
      {
        type: 'String',
        showOn: {
          key: 'ceilingTypes',
          values: ['PARTIAL', 'UNKNOWN'],
        },
        fieldProps: {
          name: 'underfloorCoverageReason',
          label: '(specify):',
          placeholder: '',
          multiline: true,
          rowsMax: 6,
          margin: 'dense',
          style: {
            marginTop: 0,
          },
        },
        refConf: {
          required: {
            value: true,
            message:
              'Please supply a reason for your underfloor coverage selection',
          },
        },
      },
    ],
  },
  {
    type: 'CheckMultipleWithText',
    fieldProps: {
      name: 'underfloorTypes',
      label: 'Type',
      options: [
        {
          name: 'SEGMENTS_BLANKETS',
          label: 'Segments/Blankets',
        },
        {
          name: 'POLYSTYRENE',
          label: 'Polystyrene',
        },
        {
          name: 'FOIL',
          label: 'Foil',
        },
        {
          name: 'BULK_WITH_FOIL_LINING',
          label: 'Bulk Insulation with foil lining',
        },
        {
          name: 'OTHER',
          label: 'Other (specify)',
        },
        {
          name: 'NOT_ACCESSIBLE',
          label: 'Underfloor space is not accessible',
        },
      ],
    },
    refConf: {
      required: {
        value: true,
        message: 'underfloor coverage must have an option selected',
      },
    },
    inners: [
      {
        type: 'String',
        showOn: {
          key: 'underfloorTypes',
          values: ['OTHER'],
        },
        fieldProps: {
          name: 'underfloorTypesOther',
          label: '(specify):',
          placeholder: '',
          multiline: true,
          rowsMax: 6,
          margin: 'dense',
          style: {
            marginTop: 0,
          },
        },
        refConf: {
          required: {
            value: true,
            message:
              'Please supply a reason for your underfloor type selection',
          },
        },
      },
    ],
  },
  {
    type: 'String',
    fieldProps: {
      name: 'underfloorBulkRValue',
      label: 'Bulk Insulation value (R-value)',
    },
    refConf: {
      required: {
        value: true,
        message: 'underfloor type must have at least one option checked',
      },
    },
  },
  {
    type: 'String',
    fieldProps: {
      name: 'underfloorMinimumThickness',
      label: 'Or minimum thickness',
    },
    refConf: {
      required: {
        value: true,
        message: 'underfloor type must have at least one option checked',
      },
    },
  },
  {
    type: 'DateTime',
    fieldProps: {
      name: 'underfloorInsulationInstallDate',
      type: 'date',
      label: 'Date insulation was installed',
      // defaultValue: moment().format('YYYY-MM-DDTkk:mm'),
    },
    refConf: {},
  },
  {
    type: 'CheckMultipleWithText',
    fieldProps: {
      name: 'underfloorConditions',
      label: 'Condition',
      options: [
        {
          name: 'REASONABLE',
          label: 'Insulation is in at least a reasonable condition',
        },
        {
          name: 'NOT_REASONABLE',
          label: 'Insulation not in a reasonable condition',
        },
        {
          name: 'NO_GAPS',
          label:
            'Insulation has no gaps other than clearances where required (e.g. around pipes)',
        },
        {
          name: 'NOT_ACCESSIBLE',
          label: 'Underfloor space is not accessible',
        },
      ],
    },
    refConf: {
      required: {
        value: true,
        message: 'underfloor type must have at least one option checked',
      },
    },
    inners: [
      {
        type: 'String',
        showOn: {
          key: 'underfloorConditions',
          values: ['NOT_REASONABLE'],
        },
        fieldProps: {
          name: 'underfloorConditionReason',
          label: '(specify):',
          placeholder: '',
          multiline: true,
          rowsMax: 6,
          margin: 'dense',
          style: {
            marginTop: 0,
          },
        },
        refConf: {
          required: {
            value: true,
            message:
              'You must explain why underfloor insualtion is not in a resoanable condition',
          },
        },
      },
    ],
  },
  {
    type: 'Subheader',
    fieldProps: {
      label: 'Wall Insulation',
    },
  },
  {
    type: 'CheckMultipleWithText',
    fieldProps: {
      name: 'wallCoverage',
      label: 'Condition',
      options: [
        {
          name: 'COMPLETE',
          label: 'Complete (all rooms)',
        },
        {
          name: 'PARTIAL',
          label: 'Partial (specify areas not insulated)',
        },
        {
          name: 'NONE',
          label: 'None',
        },
        {
          name: 'UNKNOWN',
          label: 'I don’t know as wall insulation is not accessible',
        },
      ],
    },
    refConf: {
      required: {
        value: true,
        message: 'Celiling type must have at least one option checked',
      },
    },
    inners: [
      {
        type: 'String',
        showOn: {
          key: 'wallCoverage',
          values: ['PARTIAL'],
        },
        fieldProps: {
          name: 'wallCoverageReason',
          label: '(specify areas not insulated)',
          placeholder: '',
          multiline: true,
          rowsMax: 6,
          margin: 'dense',
          style: {
            marginTop: 0,
          },
        },
        refConf: {
          required: {
            value: true,
            message: 'You must specifiy areas not insulated',
          },
        },
      },
    ],
  },
  {
    type: 'String',
    fieldProps: {
      name: 'supplementaryInfo',
      label: 'Any other details about the type or condition if known:',
    },
    refConf: {},
  },
  {
    type: 'DateTime',
    fieldProps: {
      name: 'lastUpgradedDate',
      type: 'date',
      label: 'Date insulation was last upgraded',
      // defaultValue: moment().format('YYYY-MM-DDTkk:mm'),
    },
    refConf: {},
  },
  {
    type: 'DateTime',
    fieldProps: {
      name: 'profesionallyAssessedDate',
      type: 'date',
      label: 'Date insulation was professionally assessed',
      // defaultValue: moment().format('YYYY-MM-DDTkk:mm'),
    },
    refConf: {},
  },
  {
    type: 'AcceptTerms',
    fieldProps: {
      name: 'declarationCheck',
      label: 'Confirm information is correct',
      // defaultValue: moment().format('YYYY-MM-DDTkk:mm'),
    },
    terms:
      'I declare that the information contained in this insulation statement is true and correct as at the date of signing and that all reasonable efforts have been made to obtain information about the location, type and condition of insulation at the premises',
    refConf: {
      required: {
        value: true,
        message:
          'You must declare that the information you have supplied is correct',
      },
      validate: value => value === true,
    },
  },
  {
    type: 'SelectOneWithText',
    fieldProps: {
      name: 'healthyHomesStandardStatement',
      label: 'Healthy Homes Standards Statement',
      options: [
        {
          name: 'WILL_COMPLY',
          label:
            'will comply with the healthy homes standards as required by section 45(1)(bb) of the Residential Tenancies Act',
        },
        {
          name: 'ALREADY_COMPLYING',
          label:
            ' already comply with the healthy homes standards as required by section 45(1)(bb) of the Residential Tenancies Act.',
        },
      ],
    },
    refConf: {
      required: {
        value: true,
        message:
          'Please select an option for complying with the healthy homes standard',
      },
    },
  },
];

export default FIELDS_CONFIG;

// import moment from 'moment';
// const FIELDS_CONFIG = [
//   {
//     type: 'Header',
//     fieldProps: {
//       label: 'INSULATION STATEMENT FORM',
//     },
//   },
//   {
//     type: 'Subheader',
//     fieldProps: {
//       label:
//         'Landlords must complete the insulation statement for a property before it can go on the market',
//     },
//   },
//   {
//     type: 'CheckReason',
//     fieldProps: {
//       name: 'meetsMinCeilingReq',
//       label:
//         'Does insulation meet the minimum requirements for ceiling insulation?',
//       defaultValue: 'Test',
//     },
//     refConf: {
//       required: {
//         value: true,
//         message:
//           'You must select an option for mmeeting minnimum ceiling requirements',
//       },
//     },
//     inners: [
//       {
//         type: 'String',
//         fieldProps: {
//           name: 'meetsMinCeilingReqReason',
//           label:
//             'Explain what exception applies and which room(s) it applies to.',
//           placeholder:
//             '(e.g. professional installer cannot access skillion ceiling above bedroom 2)',
//           multiline: true,
//           rowsMax: 6,
//           margin: 'dense',
//           style: {
//             marginTop: 0,
//           },
//         },
//         refConf: {
//           required: {
//             value: true,
//             message: 'You must have a reson when selecting no',
//           },
//         },
//       },
//     ],
//   },
//   {
//     type: 'CheckMultipleWithText',
//     fieldProps: {
//       name: 'wallCoverage',
//       label: 'Condition',
//       options: [
//         {
//           name: 'COMPLETE',
//           label: 'Complete (all rooms)',
//         },
//         {
//           name: 'PARTIAL',
//           label: 'Partial (specify areas not insulated)',
//         },
//         {
//           name: 'NONE',
//           label: 'None',
//         },
//         {
//           name: 'UNKNOWN',
//           label: 'I don’t know as wall insulation is not accessible',
//         },
//       ],
//     },
//     refConf: {
//       required: {
//         value: true,
//         message: 'Celiling type must have at least one option checked',
//       },
//     },
//     inners: [
//       {
//         type: 'String',
//         showOn: {
//           key: 'wallCoverage',
//           values: ['PARTIAL'],
//         },
//         fieldProps: {
//           name: 'wallCoverageReason',
//           label: '(specify areas not insulated)',
//           placeholder: '',
//           multiline: true,
//           rowsMax: 6,
//           margin: 'dense',
//           style: {
//             marginTop: 0,
//           },
//         },
//         refConf: {
//           required: {
//             value: true,
//             message: 'You must specifiy areas not insulated',
//           },
//         },
//       },
//     ],
//   },
// ];

// export default FIELDS_CONFIG;
