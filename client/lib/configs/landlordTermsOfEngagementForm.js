import INSULATIONFORM_CONF from '../../lib/configs/insulationStatementForm';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import moment from 'moment';

const LANDLORD_TERMS_OF_ENGAGEMENT_FORM_CONF = [
  {
    type: 'Location',
    key: 'currentAddress',
    mapToObjectKey: 'currentAddress',
    fieldProps: {
      name: 'currentAddress',
      fieldMaps: {
        placeId: 'placeId',
        desc: 'desc',
        lat: 'lat',
        lng: 'lng',
      },
      label: 'Property Location',
    },
    refConf: {
      required: {
        value: true,
        message: 'You to supply your current physical address',
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
    type: 'BankAccount',
    key: 'bankDetails',
    fieldProps: {
      name: 'bankDetails',
      label: 'Bank account number',
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
  // Authority to act as Manager:
  {
    type: 'Section',
    fieldProps: {
      label: 'Authority to act as Manager:',
    },
    inners: [
      {
        type: 'RTypography',
        content:
          'Authority Signed: by the Owner/s or Person duly authorised to act on behalf of the Owner/s',
        fieldProps: {
          variant: 'body1',
        },
      },
      //
      {
        type: 'Signature',
        fieldProps: {},
      },
      {
        type: 'RTypography',
        content: 'Rehouser Property Management signed',
        fieldProps: {
          variant: 'body1',
        },
      },
      {
        type: 'Image',
        fieldProps: {
          style: {
            paddingTop: '120px',
          },
          imageStyle: {
            height: '120px',
          },
          src: '/images/signatures/rehouser_admin_signature.png',
        },
      },
      {
        type: 'RTypography',
        content: `Date: ${moment().format('DD / MM / YYYY')}`,
        fieldProps: {
          variant: 'body1',
        },
      },
    ],
  },
  {
    type: 'Checkbox',
    key: 'acceptedTermsOfEngagement',
    fieldProps: {
      name: 'acceptedTermsOfEngagement',
      label: 'terms of engagement',
      helperText: 'your bank account to pay profits into',
    },
    refConf: {
      required: {
        value: true,
        message:
          'you need to accept the terms of engagement before you can proceed',
      },
    },
  },
];
export { LANDLORD_TERMS_OF_ENGAGEMENT_FORM_CONF };
export default LANDLORD_TERMS_OF_ENGAGEMENT_FORM_CONF;
