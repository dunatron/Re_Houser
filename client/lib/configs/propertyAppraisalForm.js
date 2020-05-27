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
  {
    type: 'Section',
    fieldProps: {
      label: 'Terms',
    },
    inners: [
      {
        type: 'Info',
        content: (
          <div>
            <p>I authorise the Landlord/Property Manager to:</p>
            <ul>
              <li>
                collect, retain and use this information for the purpose of
                assessing my creditworthiness and suitability for the tenancy
              </li>
              <li>
                disclose information about me, whether collected from me
                directly or from any other source, to any other credit provider
                or any credit reporting agency for the purposes of providing or
                obtaining a credit report (which will involve the credit
                reporting agency providing information about me to the
                Landlord/Property Manager)
              </li>
            </ul>
            <p>I understand that the credit reporting agency: </p>
            <ul>
              <li>
                may hold my information on their credit reporting database and
                use it for providing credit reporting services, and they may
                disclose my information to their subscribers for the purpose of
                credit checking or debt collection
              </li>
              <li>
                as part of providing a credit report, may check the Ministry of
                Justice fines database for any overdue fines I may have.
              </li>
            </ul>
            <p>
              Under the Privacy Act 1993, you have the right to ask for a copy
              of all information held about you, and have the right to request
              the correction of any incorrect information
            </p>
          </div>
        ),
      },
      {
        type: 'AcceptTerms',
        key: 'acceptedTerms',
        fieldProps: {
          name: 'acceptedTerms',
          label: 'Confirm information is correct',
          // defaultValue: moment().format('YYYY-MM-DDTkk:mm'),
        },
        terms:
          'I declare That I have read all the terms and stuff. We need to be clear as day with this.',
        refConf: {
          required: {
            value: true,
            message:
              'You must declare that the information you have supplied is correct',
          },
          validate: value => value === true,
        },
      },
    ],
  },
];

export { PROPERTY_APPRAISAL_CONF };

export default PROPERTY_APPRAISAL_CONF;
