export const USER_PROFILE_CONF = [
  {
    type: 'Email',
    key: 'email',
    fieldProps: {
      name: 'email',
      label: 'My email',
    },
    ratingVal: 10,
    includeInRentalApplication: true,
    editableInRentalApplication: false,
    validation: [
      {
        key: 'isEmpty',
        reverse: true,
        message: 'Email cannot be empty',
      },
      {
        key: 'isEmail',
        message: 'Email field must be a valid email',
      },
    ],
  },
  {
    type: 'String',
    key: 'firstName',
    fieldProps: {
      name: 'firstName',
      label: 'First Name',
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
    key: 'lastName',
    fieldProps: {
      name: 'lastName',
      label: 'Last Name',
    },
    ratingVal: 10,
    includeInRentalApplication: true,
    editableInRentalApplication: false,
    validation: [
      {
        key: 'isEmpty',
        reverse: true,
        message: 'LasName  cannot be empty',
      },
    ],
  },
  {
    type: 'Date',
    key: 'dob',
    fieldProps: {
      name: 'dob',
      label: 'Date of birth',
    },
    ratingVal: 10,
    includeInRentalApplication: true,
    editableInRentalApplication: true,
    validation: [
      {
        key: 'isEmpty',
        reverse: true,
        message: 'date of birth cannot be empty',
      },
    ],
  },
  {
    type: 'Phone',
    key: 'phone',
    fieldProps: {
      name: 'phone',
      label: 'My Phone',
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
    key: 'emergencyContactName',
    fieldProps: {
      name: 'emergencyContactName',
      label: 'Emergency Contact Name',
    },
    ratingVal: 10,
    includeInRentalApplication: true,
    editableInRentalApplication: true,
    validation: [
      {
        key: 'isEmpty',
        reverse: true,
        message: 'Emergency Contact Name  cannot be empty',
      },
    ],
  },
  {
    type: 'Phone',
    key: 'emergencyContactNumber',
    fieldProps: {
      name: 'emergencyContactNumber',
      label: 'Emergency Contact Number',
    },
    ratingVal: 10,
    includeInRentalApplication: true,
    editableInRentalApplication: true,
  },
  {
    type: 'Email',
    key: 'emergencyContactEmail',
    fieldProps: {
      name: 'emergencyContactEmail',
      label: 'Emergency Contact Email',
    },
    ratingVal: 10,
    includeInRentalApplication: true,
    editableInRentalApplication: true,
    validation: [
      {
        key: 'isEmpty',
        reverse: true,
        message: 'Emergency Contact Email  cannot be empty',
      },
      {
        key: 'isEmail',
        message: 'Emergency Contact Email must be a valid email',
      },
    ],
  },
  {
    type: 'String',
    key: 'referee1Name',
    fieldProps: {
      name: 'referee1Name',
      label: 'Referee 1 Name',
    },
    ratingVal: 10,
    includeInRentalApplication: true,
    editableInRentalApplication: true,
  },
  {
    type: 'Phone',
    key: 'referee1Phone',
    fieldProps: {
      name: 'referee1Phone',
      label: 'Referee 1 Phone',
    },
    ratingVal: 10,
    includeInRentalApplication: true,
    editableInRentalApplication: true,
  },
  {
    type: 'Email',
    key: 'referee1Email',
    fieldProps: {
      name: 'referee1Email',
      label: 'Referee 1 Email',
    },
    ratingVal: 10,
    includeInRentalApplication: true,
    editableInRentalApplication: true,
  },
  {
    type: 'String',
    key: 'referee2Name',
    fieldProps: {
      name: 'referee2Name',
      label: 'Referee 2 Name',
    },
    ratingVal: 10,
    includeInRentalApplication: true,
    editableInRentalApplication: true,
  },
  {
    type: 'Phone',
    key: 'referee2Phone',
    fieldProps: {
      name: 'referee2Phone',
      label: 'Referee 2 Phone',
    },
    ratingVal: 10,
    includeInRentalApplication: true,
    editableInRentalApplication: true,
    // validation: [
    //   {
    //     key: "isEmpty",
    //     message: "You need this",
    //   },
    // ],
  },
  {
    type: 'Email',
    key: 'referee2Email',
    fieldProps: {
      name: 'referee2Email',
      label: 'Referee 2 Email',
    },
    ratingVal: 10,
    includeInRentalApplication: true,
    editableInRentalApplication: true,
  },
];

// export { USER_PROFILE_CONF }
// export default USER_PROFILE_CONF
