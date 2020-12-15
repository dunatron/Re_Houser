const leasePdf = lease => {
  // map the owners
  // lessors
  // lessees
  // property
  // rent
  // type and all of it
  return [
    {
      type: 'Section',
      value: '',
      fieldProps: {},
      layoutProps: {
        variant: 'column',
        wrap: true,
      },
      inners: [
        {
          type: 'Text',
          value: 'Privacy Policy',
          fieldProps: {
            variant: 'h1',
          },
          layoutProps: {
            variant: 'left',
          },
        },
      ],
    },
  ];
};
