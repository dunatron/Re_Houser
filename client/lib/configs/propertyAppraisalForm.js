const PROPERTY_APPRAISAL_CONF = [
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
    key: 'rooms',
    fieldProps: {
      name: 'rooms',
      label: 'number of bedrooms on the property',
    },
    refConf: {
      required: {
        value: true,
        message:
          'You need to supply the number of bedrooms on the property for an appraisal',
      },
    },
  },
  {
    type: 'Int',
    key: 'bathrooms',
    fieldProps: {
      name: 'bathrooms',
      label: 'number of bedrooms on the property',
    },
    refConf: {
      required: {
        value: true,
        message:
          'You need to supply the number of bathrooms on the property for an appraisal',
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

export { PROPERTY_APPRAISAL_CONF };

export default PROPERTY_APPRAISAL_CONF;
