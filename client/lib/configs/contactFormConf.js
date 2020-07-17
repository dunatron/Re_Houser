import INSULATIONFORM_CONF from '../../lib/configs/insulationStatementForm';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';

const CONTACT_FORM_CONF = [
  {
    type: 'Header',
    fieldProps: {
      label: 'Contact form',
    },
  },
  {
    type: 'String',
    key: 'firstName',
    fieldProps: {
      label: 'Your name',
      name: 'firstName',
    },
  },
  {
    type: 'String',
    key: 'email',
    fieldProps: {
      label: 'Your email',
      name: 'email',
    },
  },
  {
    type: 'String',
    key: 'message',
    fieldProps: {
      label: 'message',
      name: 'message',
      multiline: true,
      rows: 3,
    },
  },
];
export { CONTACT_FORM_CONF };
export default CONTACT_FORM_CONF;
