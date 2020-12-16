const _generateLeasePdfConf = lease => {
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
          value: 'Tenancy Agreement – Tenant Contract – Terms and Conditions.',
          fieldProps: {
            variant: 'h2',
          },
          layoutProps: {
            variant: 'left',
          },
        },
        {
          type: 'Text',
          value:
            'Online authentication has occurred to confirm the parties are who they say they are. The parties consent to this agreement being in electronic form, being signed by either of them electronically and acknowledge that an electronic signature to this agreement is binding and valid.',
          fieldProps: {
            variant: 'body2',
            gutterBottom: true,
          },
          layoutProps: {
            variant: 'left',
          },
        },
        {
          type: 'Text',
          value:
            'This Agreement is subject to Provisions of the Residential Tenancies Act 1986, and by any subsequent amendments.',
          fieldProps: {
            variant: 'body2',
          },
          layoutProps: {
            variant: 'left',
          },
        },
      ],
    },
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
          value: '1. Landlord’s responsibilities',
          fieldProps: { variant: 'h6' },
          layoutProps: { variant: 'left' },
        },
        {
          type: 'List',
          fieldProps: { variant: 'ol', type: 'A', start: 'F' },
          layoutProps: { variant: 'left' },
          inners: [
            {
              type: 'Li',
              // listStyle: 'number',
              listNum: 'a.',
              // title: 'Account Registration.',
              value:
                'Provide and maintain the premises in a reasonable condition.',
              fieldProps: { variant: 'body1' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              // listStyle: 'number',
              listNum: 'b.',
              // title: 'Account Registration.',
              value: 'Allow the tenant quiet enjoyment of the premises.',
              fieldProps: { variant: 'body1' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              // listStyle: 'number',
              listNum: 'c.',
              // title: 'Account Registration.',
              value:
                'Comply with all building, health and safety standards that apply to the premises, ensuring smoke alarms are installed and functioning at the commencement of the tenancy.',
              fieldProps: { variant: 'body1' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              // listStyle: 'number',
              listNum: 'd.',
              // title: 'Account Registration.',
              value:
                'Comply with all requirements in respect of smoke alarms imposed on the Landlord by regulations.',
              fieldProps: { variant: 'body1' },
              layoutProps: { variant: 'left' },
            },
            {
              type: 'Li',
              // listStyle: 'number',
              listNum: 'e.',
              // title: 'Account Registration.',
              value:
                'Landlords need to have working smoke alarms installed in all their residential rental homes. Any replacement alarms installed after 1 July 2016 (other than hard-wired systems) need to have long life batteries and a photoelectric sensor.',
              fieldProps: { variant: 'body1' },
              layoutProps: { variant: 'left' },
            },
          ],
        },
      ],
    },
  ];
};

export default _generateLeasePdfConf;
