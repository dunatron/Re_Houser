export const USER_PROFILE_CONF = [
  {
    label: 'My Email',
    variableName: 'email',
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
    label: 'My First Name',
    variableName: 'firstName',
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
    label: 'My Last Name',
    variableName: 'lastName',
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
    label: 'My Phone',
    variableName: 'phone',
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
    label: 'Emergency Contact Name',
    variableName: 'emergencyContactName',
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
    label: 'Emergency Contact Number',
    variableName: 'emergencyContactNumber',
    ratingVal: 10,
    includeInRentalApplication: true,
    editableInRentalApplication: true,
  },
  {
    label: 'Emergency Contact Email',
    variableName: 'emergencyContactEmail',
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
    label: 'Referee 1 Name',
    variableName: 'referee1Name',
    ratingVal: 10,
    includeInRentalApplication: true,
    editableInRentalApplication: true,
  },
  {
    label: 'Referee 1 Phone',
    variableName: 'referee1Phone',
    ratingVal: 10,
    includeInRentalApplication: true,
    editableInRentalApplication: true,
  },
  {
    label: 'Referee 1 Email',
    variableName: 'referee1Email',
    ratingVal: 10,
    includeInRentalApplication: true,
    editableInRentalApplication: true,
  },
  {
    label: 'Referee 2 Name',
    variableName: 'referee2Name',
    ratingVal: 10,
    includeInRentalApplication: true,
    editableInRentalApplication: true,
  },
  {
    label: 'Referee 2 Phone',
    variableName: 'referee2Phone',
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
    label: 'Referee 2 Email',
    variableName: 'referee2Email',
    ratingVal: 10,
    includeInRentalApplication: true,
    editableInRentalApplication: true,
  },
];

// export { USER_PROFILE_CONF }
// export default USER_PROFILE_CONF
