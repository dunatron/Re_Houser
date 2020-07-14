const PRE_TENANCY_FORM_CONF = [
  {
    type: 'Header',
    fieldProps: {
      label: 'Pre Tenancy Form',
    },
  },
  {
    type: 'Section',
    fieldProps: {
      label: 'Your Details',
    },
    inners: [
      {
        type: 'Boolean',
        key: 'firstTimeTenant',
        fieldProps: {
          name: 'firstTimeTenant',
          label: 'Are you a first time tenant',
        },
        refConf: {
          required: {
            value: true,
            message: 'You need to specifiy if you are first time tenant or not',
          },
        },
      },
      {
        type: 'String',
        key: 'fullName',
        fieldProps: {
          name: 'fullName',
          label: 'Your Fullname',
        },
        refConf: {
          required: {
            value: true,
            message: 'You need a fullname',
          },
        },
      },
      {
        type: 'Date',
        key: 'dob',
        fieldProps: {
          name: 'dob',
          label: 'Your date of birth',
        },
        refConf: {
          required: {
            value: true,
            message: 'You need a date of birth',
          },
        },
      },
      {
        type: 'String',
        key: 'phone',
        fieldProps: {
          name: 'phone',
          label: 'Your phone number',
        },
        refConf: {
          required: {
            value: true,
            message: 'You need a phone number',
          },
        },
      },
      {
        type: 'String',
        key: 'email',
        fieldProps: {
          name: 'email',
          label: 'Your email',
        },
        refConf: {
          required: {
            value: true,
            message: 'You need a an email',
          },
        },
      },
    ],
  },
  {
    type: 'Section',
    fieldProps: {
      label: 'Current Address',
    },
    inners: [
      {
        type: 'Location',
        key: 'currentLocation',
        fieldProps: {
          name: 'currentLocation',
          fieldMaps: {
            placeId: 'placeId',
            desc: 'currentLocation',
            lat: 'currentLocationLat',
            lng: 'currentLocationLng',
          },
          label: 'Property Location',
        },
        refConf: {
          required: {
            value: true,
            message: 'You to supply your current location',
          },
        },
      },
      {
        type: 'File',
        key: 'proofOfAddress',
        fieldProps: {
          isMultiple: false,
          maxFilesAllowed: 1,
          name: 'proofOfAddress',
          label: 'Proof of address',
          description:
            'You need to upload a document which confirms your current address such as a bank statement',
        },
        refConf: {
          required: {
            value: true,
            message:
              'You need to upload a document which confirms your current address such as a bank statement',
          },
        },
      },
      {
        type: 'Int',
        key: 'yearsAtAddress',
        fieldProps: {
          name: 'yearsAtAddress',
          label: 'Years at current address',
          InputProps: { inputProps: { min: 0 } },
        },
        refConf: {
          required: {
            value: true,
            message:
              'You need to tell us how many years you have lived at the current address',
          },
        },
      },
      {
        type: 'Int',
        key: 'monthsAtAddress',
        fieldProps: {
          name: 'monthsAtAddress',
          label: 'Months at current address',
          InputProps: { inputProps: { min: 0, max: 12 } },
        },
        refConf: {
          required: {
            value: true,
            message:
              'You need to tell us how many months you have lived at the current address',
          },
        },
      },
      {
        type: 'String',
        key: 'reasonForLeaving',
        fieldProps: {
          name: 'reasonForLeaving',
          label: 'Reason for leaving',
        },
        refConf: {
          required: {
            value: true,
            message:
              'You need to tell us your reason for leaving your current address',
          },
        },
      },
      {
        type: 'String',
        key: 'currentLandlordName',
        fieldProps: {
          name: 'currentLandlordName',
          label: 'Current landlord fullname',
        },
        refConf: {
          required: {
            value: true,
            message: 'You need to specify your current landlords name',
          },
        },
      },
      {
        type: 'String',
        key: 'currentLandlordNumber',
        fieldProps: {
          name: 'currentLandlordNumber',
          label: 'Current landlord phone',
        },
        refConf: {
          required: {
            value: true,
            message: 'You need to specify your current landlords phone number',
          },
        },
      },
      {
        type: 'String',
        key: 'currentLandlordEmail',
        fieldProps: {
          name: 'currentLandlordEmail',
          label: 'Current landlord email',
        },
        refConf: {
          required: {
            value: true,
            message: 'You need to specify your current landlords email',
          },
        },
      },
      {
        type: 'Boolean',
        key: 'consentToLandlordContact',
        fieldProps: {
          name: 'consentToLandlordContact',
          label: 'Do you consent to use contacting your current landlord',
        },
        refConf: {
          required: {
            value: true,
            message: 'You need to specify your current landlords email',
          },
        },
      },
    ],
  },
  {
    type: 'Section',
    fieldProps: {
      label: 'Referees',
    },
    inners: [
      {
        type: 'String',
        key: 'referrence1Name',
        fieldProps: {
          name: 'referrence1Name',
          label: 'Referee one fullname',
        },
        refConf: {
          required: {
            value: true,
            message: 'You need to state your referees fullname',
          },
        },
      },
      {
        type: 'String',
        key: 'referrence1Phone',
        fieldProps: {
          name: 'referrence1Phone',
          label: 'Referee one phone',
        },
        refConf: {
          required: {
            value: true,
            message: 'You need to state your referees phone',
          },
        },
      },
      {
        type: 'String',
        key: 'referrence1Email',
        fieldProps: {
          name: 'referrence1Email',
          label: 'Referee one email',
        },
        refConf: {
          required: {
            value: true,
            message: 'You need to state your referees email',
          },
        },
      },
      {
        type: 'String',
        key: 'referrence2Name',
        fieldProps: {
          name: 'referrence2Name',
          label: 'Referee two fullname',
        },
        refConf: {
          required: {
            value: true,
            message: 'You need to state your referees fullname',
          },
        },
      },
      {
        type: 'String',
        key: 'referrence2Phone',
        fieldProps: {
          name: 'referrence2Phone',
          label: 'Referee two phone',
        },
        refConf: {
          required: {
            value: true,
            message: 'You need to state your referees phone',
          },
        },
      },
      {
        type: 'String',
        key: 'referrence2Email',
        fieldProps: {
          name: 'referrence2Email',
          label: 'Referee two email',
        },
        refConf: {
          required: {
            value: true,
            message: 'You need to state your referees email',
          },
        },
      },
    ],
  },
  {
    type: 'Section',
    fieldProps: {
      label: 'Terms',
    },
    inners: [
      {
        type: 'Info',
        content: (
          <div>
            <p>I authorise the Landlord/Property Manager to:</p>
            <ul>
              <li>
                collect, retain and use this information for the purpose of
                assessing my creditworthiness and suitability for the tenancy
              </li>
              <li>
                disclose information about me, whether collected from me
                directly or from any other source, to any other credit provider
                or any credit reporting agency for the purposes of providing or
                obtaining a credit report (which will involve the credit
                reporting agency providing information about me to the
                Landlord/Property Manager)
              </li>
            </ul>
            <p>I understand that the credit reporting agency: </p>
            <ul>
              <li>
                may hold my information on their credit reporting database and
                use it for providing credit reporting services, and they may
                disclose my information to their subscribers for the purpose of
                credit checking or debt collection
              </li>
              <li>
                as part of providing a credit report, may check the Ministry of
                Justice fines database for any overdue fines I may have.
              </li>
            </ul>
            <p>
              Under the Privacy Act 1993, you have the right to ask for a copy
              of all information held about you, and have the right to request
              the correction of any incorrect information
            </p>
          </div>
        ),
      },
      {
        type: 'AcceptTerms',
        key: 'acceptedTerms',
        fieldProps: {
          name: 'acceptedTerms',
          label: 'Confirm information is correct',
          // defaultValue: moment().format('YYYY-MM-DDTkk:mm'),
        },
        terms:
          'I declare that the information contained in this insulation statement is true and correct as at the date of signing and that all reasonable efforts have been made to obtain information about the location, type and condition of insulation at the premises',
        refConf: {
          required: {
            value: true,
            message:
              'You must declare that the information you have supplied is correct',
          },
          validate: value => value === true,
        },
      },
    ],
  },
];

export default PRE_TENANCY_FORM_CONF;
