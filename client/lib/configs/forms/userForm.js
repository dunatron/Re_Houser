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
        message: 'You must have a firstname',
      },
    },
  },
  {
    type: 'String',
    key: 'lastName',
    fieldProps: {
      label: 'Last Name',
      name: 'lastName',
      variant: 'standard',
    },
    refConf: {
      required: {
        value: true,
        message: 'You must have a lastname',
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
        message: 'You must have a phone to contact you',
      },
    },
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
    permissions: ['WIZARD'],
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
    permissions: ['WIZARD'],
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
    permissions: ['WIZARD'],
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
    permissions: ['ADMIN'],
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
    permissions: ['ADMIN', 'WIZARD'],
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

export { USER_FORM_CONF };
export default USER_FORM_CONF;
