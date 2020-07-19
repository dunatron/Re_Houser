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
    type: 'String',
    key: 'bankAccNumber',
    fieldProps: {
      isMultiple: false,
      maxFilesAllowed: 1,
      name: 'bankAccNumber',
      label: 'bankAccNumber',
      description: '',
      helperText:
        'Fucxk you talking bout bitch? I aint cold I am that King cold',
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
