const REFEREE_FORM_CONF = [
  {
    type: 'String',
    key: 'name',
    fieldProps: {
      label: 'Fullname ',
      name: 'name',
      variant: 'standard',
    },
    refConf: {
      required: {
        value: true,
        message: 'Please supply the referees firstname',
      },
    },
  },
  {
    type: 'Email',
    key: 'email',
    fieldProps: {
      label: 'Email ',
      name: 'email',
      variant: 'standard',
    },
    refConf: {
      required: {
        value: true,
        message: 'Please supply the referees email',
      },
    },
  },
  {
    type: 'Phone',
    key: 'phone',
    fieldProps: {
      label: 'Phone ',
      name: 'phone',
      variant: 'standard',
    },
    refConf: {
      required: {
        value: true,
        message: 'Please supply the referees phone',
      },
    },
  },
  {
    type: 'SelectOneEnum',
    key: 'relationship',
    __type: 'RefereeRelationship',
    fieldProps: {
      label: 'Relationship ',
      name: 'relationship',
      variant: 'standard',
    },
    refConf: {
      required: {
        value: true,
        message: 'Please supply the referees relationship to you',
      },
    },
  },
];
export { REFEREE_FORM_CONF };
export default REFEREE_FORM_CONF;
