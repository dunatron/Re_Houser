export const LANDLORD_USER_CONF = [
  {
    type: 'BankAccount',
    key: 'bankDetails',
    fieldProps: {
      name: 'bankDetails',
      label: 'Bank Account',
    },
    ratingVal: 10,
    includeInRentalApplication: true,
    editableInRentalApplication: false,
    validation: [
      {
        key: 'isEmpty',
        reverse: true,
        message: 'FirstName  cannot be empty',
      },
    ],
  },
  {
    type: 'String',
    key: 'bondLodgementNumber',
    fieldProps: {
      name: 'bondLodgementNumber',
      label: 'Bond Lodgement Number',
    },
    ratingVal: 10,
    includeInRentalApplication: true,
    editableInRentalApplication: true,
    validation: [
      {
        key: 'isEmpty',
        reverse: true,
        message: 'Phone  cannot be empty',
      },
    ],
  },
  {
    type: 'String',
    key: 'bondLodgementNumber',
    fieldProps: {
      name: 'bondLodgementNumber',
      label: 'Bond Lodgement Number',
    },
    ratingVal: 10,
    includeInRentalApplication: true,
    editableInRentalApplication: true,
    validation: [
      {
        key: 'isEmpty',
        reverse: true,
        message: 'Phone  cannot be empty',
      },
    ],
  },
  {
    type: 'String',
    key: 'bondLodgementNumber',
    fieldProps: {
      name: 'bondLodgementNumber',
      label: 'Bond Lodgement Number',
    },
    ratingVal: 10,
    includeInRentalApplication: true,
    editableInRentalApplication: true,
    validation: [
      {
        key: 'isEmpty',
        reverse: true,
        message: 'Phone  cannot be empty',
      },
    ],
  },
];
