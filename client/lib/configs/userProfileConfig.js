export const USER_PROFILE_CONF = [
  {
    type: 'Email',
    key: 'email',
    fieldProps: {
      name: 'email',
      label: 'Email',
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
      label: 'Firstname',
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
      label: 'Lastname',
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
      label: 'Phone',
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
];

// export { USER_PROFILE_CONF }
// export default USER_PROFILE_CONF
