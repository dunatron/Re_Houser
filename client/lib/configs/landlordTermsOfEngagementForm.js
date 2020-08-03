import INSULATIONFORM_CONF from '../../lib/configs/insulationStatementForm';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';

const LANDLORD_TERMS_OF_ENGAGEMENT_FORM_CONF = [
  {
    type: 'File',
    key: 'proofOfAddress',
    fieldProps: {
      isMultiple: false,
      maxFilesAllowed: 1,
      name: 'proofOfAddress',
      label: 'Proof of address',
      description:
        'This is your proof of  address so we can confrim you are who you say you are',
    },
    refConf: {
      required: {
        value: true,
        message: 'You need to upoad a file that proves you own the property',
      },
    },
  },
  {
    type: 'File',
    key: 'photoIdentification',
    fieldProps: {
      isMultiple: false,
      maxFilesAllowed: 1,
      name: 'photoIdentification',
      label: 'Photo Identification',
      description:
        'You need a file attached for identification such as a passport or drivers NZ drivers license',
    },
    refConf: {
      required: {
        value: true,
        message:
          'You need a file attached for identification such as a passport or drivers NZ drivers license',
      },
    },
    inners: [
      {
        type: 'String',
        key: 'identificationNumber',
        fieldProps: {
          name: 'identificationNumber',
          label: 'Identification number',
        },
        refConf: {
          required: {
            value: true,
            message: 'You need the identifications id number',
          },
        },
      },
    ],
  },
  {
    type: 'String',
    key: 'bankAccNumber',
    fieldProps: {
      isMultiple: false,
      maxFilesAllowed: 1,
      name: 'bankAccNumber',
      label: 'bankAccNumber',
      description: '',
      helperText: 'your bank account to pay profits into',
    },
    refConf: {
      required: {
        value: true,
        message:
          'We need a bank account number to know where to pay your profits',
      },
    },
  },
];
export { LANDLORD_TERMS_OF_ENGAGEMENT_FORM_CONF };
export default LANDLORD_TERMS_OF_ENGAGEMENT_FORM_CONF;
