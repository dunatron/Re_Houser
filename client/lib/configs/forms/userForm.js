const USER_FORM_CONF = [
  {
    type: 'String',
    key: 'firstName',
    fieldProps: {
      label: 'First Name',
      name: 'firstName',
      variant: 'standard',
    },
    refConf: {
      required: {
        value: true,
        message: 'You must have a firstName',
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
        message: 'You must have an email',
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
    refConf: {},
  },
  {
    type: 'BankAccount',
    key: 'bankDetails',
    fieldProps: {
      label: 'Bank Account',
      name: 'bankDetails',
      variant: 'standard',
      placeholder: 'BB-bbbb-AAAAAAA-SSS',
    },
    refConf: {},
  },
  {
    type: 'Boolean',
    key: 'emailValidated',
    fieldProps: {
      label: 'Email Validated',
      name: 'emailValidated',
      variant: 'standard',
    },
    refConf: {},
  },
  {
    type: 'Boolean',
    key: 'acceptedSignupTerms',
    fieldProps: {
      label: 'Accepted Signup Terms',
      name: 'acceptedSignupTerms',
      variant: 'standard',
    },
    refConf: {},
  },
  {
    type: 'Boolean',
    key: 'acceptedTermsOfEngagement',
    fieldProps: {
      label: 'Accepted Terms of Engagement',
      name: 'acceptedTermsOfEngagement',
      variant: 'standard',
    },
    refConf: {},
  },
  {
    type: 'Date',
    key: 'dob',
    fieldProps: {
      label: 'DOB',
      name: 'dob',
      variant: 'standard',
    },
    refConf: {},
  },
  {
    type: 'String',
    key: 'bondLodgementNumber',
    fieldProps: {
      label: 'Bond Lodgement Num',
      name: 'bondLodgementNumber',
      variant: 'standard',
    },
    refConf: {},
  },
  {
    type: 'String',
    key: 'emergencyContactName',
    fieldProps: {
      label: 'Emergency Contact Name',
      name: 'emergencyContactName',
      variant: 'standard',
    },
    refConf: {},
  },
  {
    type: 'Phone',
    key: 'emergencyContactNumber',
    fieldProps: {
      label: 'Emergency Contact Number',
      name: 'emergencyContactNumber',
      variant: 'standard',
    },
    refConf: {},
  },
  {
    type: 'Email',
    key: 'emergencyContactEmail',
    fieldProps: {
      label: 'Emergency Contact EMail',
      name: 'emergencyContactEmail',
      variant: 'standard',
    },
    refConf: {},
  },
  {
    type: 'Section',
    fieldProps: {
      label: 'Admin Settings',
    },
    inners: [
      {
        type: 'Boolean',
        key: 'adminSettings.appraisalCreatedSub',
        fieldProps: {
          label: 'Appraisal Created Sub',
          name: 'adminSettings.appraisalCreatedSub',
          variant: 'standard',
        },
        refConf: {},
      },
      {
        type: 'Boolean',
        key: 'adminSettings.propertyCreatedSub',
        fieldProps: {
          label: 'Property Created Sub',
          name: 'adminSettings.propertyCreatedSub',
          variant: 'standard',
        },
        refConf: {},
      },
      {
        type: 'Boolean',
        key: 'adminSettings.rentalApplicationCreatedSub',
        fieldProps: {
          label: 'Rental Application Created Sub',
          name: 'adminSettings.rentalApplicationCreatedSub',
          variant: 'standard',
        },
        refConf: {},
      },
    ],
  },
  {
    type: 'Section',
    fieldProps: {
      label: 'User Files',
    },
    inners: [
      {
        type: 'File',
        key: 'profilePhoto',
        fieldProps: {
          label: 'Profile Photo',
          name: 'profilePhoto',
          variant: 'standard',
        },
        refConf: {},
      },
      {
        type: 'File',
        key: 'photoIdentification',
        fieldProps: {
          label: 'Photo ID',
          name: 'photoIdentification',
          variant: 'standard',
        },
        refConf: {},
      },
      {
        type: 'File',
        key: 'proofOfAddress',
        fieldProps: {
          label: 'Profile Address',
          name: 'proofOfAddress',
          variant: 'standard',
        },
        refConf: {},
      },
    ],
  },
  {
    type: 'SelectMultipleEnum',
    key: 'permissions',
    __type: 'Permission',
    fieldProps: {
      label: 'Permissions ',
      name: 'permissions',
      variant: 'standard',
    },
    refConf: {
      required: {
        value: true,
        message: 'Please supply the users permissions',
      },
    },
  },
];

// user: {
//     referees,
//     rehouserStamp,
//     adminSettings,
//     identificationNumber,
//     currentAddress,
//     signature,
//     permissions,
//   },
export { USER_FORM_CONF };
export default USER_FORM_CONF;
