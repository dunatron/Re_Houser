const ADD_FOREIGN_LINK_FORM_CONF = [
  {
    type: 'String',
    key: 'name',
    fieldProps: {
      label: 'name',
      name: 'name',
      variant: 'standard',
    },
    refConf: {
      required: {
        value: true,
        message: 'You need a name for the link',
      },
    },
  },
  {
    type: 'String',
    key: 'url',
    fieldProps: {
      label: 'url',
      name: 'url',
      variant: 'standard',
    },
    refConf: {
      required: {
        value: true,
        message: 'You need the url of the link',
      },
    },
  },
  {
    type: 'String',
    key: 'notes',
    fieldProps: {
      label: 'notes',
      name: 'notes',
      variant: 'standard',
    },
    refConf: {
      required: {
        value: true,
        message: 'You need the url of the link',
      },
    },
  },
];

export { ADD_FOREIGN_LINK_FORM_CONF };
export default ADD_FOREIGN_LINK_FORM_CONF;
