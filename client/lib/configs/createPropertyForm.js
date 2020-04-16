import INSULATIONFORM_CONF from '../../lib/configs/insulationStatementForm';

const CREATE_PROPERTY_FORM_CONF = [
  {
    type: 'Header',
    key: 'TheHeader',
    fieldProps: {
      label: 'Create Property',
    },
  },
  // {
  //   type: 'Int',
  //   key: 'rooms',
  //   fieldProps: {
  //     name: 'rooms',
  //     label: 'rooms',
  //   },
  //   refConf: {
  //     required: {
  //       value: true,
  //       message:
  //         'You need to supply the number of rooms when creating a property',
  //     },
  //   },
  // },
  {
    type: 'Entity',
    key: 'insulationForm',
    resolveKey: 'insulationForm',
    required: false,

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
      label: 'My Special rabbit let em have it',
    },
    inners: [
      {
        type: 'Subheader',
        fieldProps: {
          label: 'Details',
        },
      },
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

  {
    type: 'SelectMultipleEnum',
    __type: 'HeatSource',
    key: 'heatSources',
    fieldProps: {
      name: 'heatSources',
      label: 'select all valid heat source on propery',
    },

    refConf: {
      required: {
        value: true,
        message: 'You need to supply heat sources for an appraisal',
      },
    },
  },
];
export { CREATE_PROPERTY_FORM_CONF };
export default CREATE_PROPERTY_FORM_CONF;
