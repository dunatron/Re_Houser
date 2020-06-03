import AppraisalTerms from '../../components/Terms/AppraisalTerms';

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
      label: 'number of bathrooms on the property',
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
    type: 'Int',
    key: 'garageSpaces',
    fieldProps: {
      name: 'garageSpaces',
      label: 'number of garages spaces on the property',
    },
    refConf: {
      required: {
        value: true,
        message:
          'You need to supply the number of garages on the property for an appraisal',
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
  {
    type: 'Section',
    fieldProps: {
      label: 'Terms',
    },
    inners: [
      {
        type: 'Info',
        content: <AppraisalTerms />,
      },
      {
        type: 'AcceptTerms',
        key: 'acceptTerms',
        fieldProps: {
          name: 'acceptTerms',
          label: 'Confirm information is correct',
          // defaultValue: moment().format('YYYY-MM-DDTkk:mm'),
        },
        terms:
          'Under the Privacy Act 1993, you have the right to ask for a copy of all information held about you, and have the right to request the correction of any incorrect information.',
        refConf: {
          required: {
            value: true,
            message:
              'You must declare that the information you have supplied is correct and you have read the terms and conditions',
          },
          validate: value => value === true,
        },
      },
    ],
  },
];

export { PROPERTY_APPRAISAL_CONF };

export default PROPERTY_APPRAISAL_CONF;
