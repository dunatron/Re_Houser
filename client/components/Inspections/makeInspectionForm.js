const makeInspectionForm = property => {
  return [
    // make sure chattels are good
    {
      type: 'Section',
      fieldProps: {
        label: 'Chattel conditions',
      },
      inners: property.chattels.map((chattel, idx) => ({
        type: 'String',
        key: `chattel.${chattel}`,
        fieldProps: {
          label: `${chattel}`,
          name: `chattel.${chattel}`,
          variant: 'standard',
        },
        refConf: {
          required: {
            value: true,
            message: `Please supply the condition of the chattel`,
          },
        },
      })),
    },
    ...property.chattels.map((chattel, idx) => ({
      type: 'String',
      key: `chattel.${chattel}`,
      fieldProps: {
        label: `chattel.${chattel}`,
        name: `chattel.${chattel}`,
        variant: 'standard',
      },
      refConf: {
        required: {
          value: true,
          message: `Please supply the condition of the chattel`,
        },
      },
    })),
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
  ];
};

export default makeInspectionForm;
