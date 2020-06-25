const RESET_PASSWORD_FORM_CONF = [
  {
    type: 'String',
    key: 'password',
    fieldProps: {
      name: 'password',
      label: 'enter new password',
    },
    refConf: {
      required: {
        value: true,
        message: 'you need to supply the password you want to change to',
      },
    },
  },
  {
    type: 'String',
    key: 'confirmPassword',
    fieldProps: {
      name: 'confirmPassword',
      label: 'confirm password',
    },
    refConf: {
      required: {
        value: true,
        message: 'you need to confirm your password change',
      },
    },
  },
];

export { RESET_PASSWORD_FORM_CONF };

export default RESET_PASSWORD_FORM_CONF;
