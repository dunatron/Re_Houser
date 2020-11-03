import INSULATIONFORM_CONF from '../../lib/configs/insulationStatementForm';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';

const CONTACT_FORM_CONF = [
  {
    type: 'Header',
    fieldProps: {
      label: 'Contact Form',
    },
    refConf: {},
  },
  {
    type: 'String',
    key: 'firstName',
    fieldProps: {
      label: 'Your name',
      name: 'firstName',
    },
    refConf: {
      required: {
        value: true,
        message: 'We need a name for a contact form',
      },
    },
  },
  {
    type: 'String',
    key: 'email',
    fieldProps: {
      label: 'Your email',
      name: 'email',
    },
    refConf: {
      required: {
        value: true,
        message: 'We need your email to be able to contact you back',
      },
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
    refConf: {
      required: {
        value: true,
        message: 'We need a message to know how to help you',
      },
    },
  },
  {
    type: 'Captcha',
    key: 'captchaToken',
    fieldProps: {
      label: 'Recaptcha token',
      name: 'captchaToken',
    },
    refConf: {
      required: {
        value: true,
        message:
          'We need to confirm you are not a robot as to not waste time with invalid submissions',
      },
    },
  },
];
export { CONTACT_FORM_CONF };
export default CONTACT_FORM_CONF;
