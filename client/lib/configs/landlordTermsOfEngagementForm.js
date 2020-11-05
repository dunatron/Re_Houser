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
      label: 'Your current address',
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
        'We accept the following: Utility company bills, Bank statement, Photographic ID with address on it, IRD statement and Correspondence from a government authority.',
      appendFolderName: 'proofOfAddress',
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
      appendFolderName: 'photoIdentification',
    },
    refConf: {
      required: {
        value: true,
        message:
          'You need a file attached for identification such as a passport or drivers NZ drivers license',
      },
    },
  },
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
  {
    type: 'String',
    key: 'bondLodgementNumber',
    fieldProps: {
      name: 'bondLodgementNumber',
      label: 'Bond lodgement number',
      helperText: 'If you have a bond lodgement number please supply it',
    },
    refConf: {},
  },
  // Authority to act as Manager:
  {
    type: 'Section',
    fieldProps: {
      label: 'I Accept the Terms of Engagement:',
    },
    inners: [
      {
        type: 'RTypography',
        content:
          'The parties consent to this agreement being in electronic form, being signed by either of them electronically and acknowledge that an electronic signature to this agreement is binding and valid.',
        fieldProps: {
          variant: 'body1',
        },
      },
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
    ],
  },
  {
    type: 'Checkbox',
    key: 'acceptedTermsOfEngagement',
    fieldProps: {
      name: 'acceptedTermsOfEngagement',
      label: 'I Accept Rehouser Property Management Ltds terms of Engagement',
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
  {
    type: 'RTypography',
    content: 'Rehouser Property Management signed',
    fieldProps: {
      variant: 'body1',
    },
  },
  {
    type: 'RTypography',
    content: `Date: ${moment().format('DD / MM / YYYY')}`,
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
];
export { LANDLORD_TERMS_OF_ENGAGEMENT_FORM_CONF };
export default LANDLORD_TERMS_OF_ENGAGEMENT_FORM_CONF;
