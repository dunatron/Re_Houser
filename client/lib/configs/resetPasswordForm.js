const RESET_PASSWORD_FORM_CONF = [
  {
    type: 'String',
    key: 'token',
    fieldProps: {
      name: 'token',
      label: 'Reset token',
      disabled: true,
    },
    refConf: {
      required: {
        value: true,
        message:
          'We need a token supplied by the system to reset your password',
      },
    },
  },
  {
    type: 'Password',
    key: 'password',
    fieldProps: {
      name: 'password',
      label: 'enter new password',
      variant: 'outlined',
    },
    refConf: {
      required: {
        value: true,
        message: 'you need to supply the password you want to change to',
      },
    },
  },
  {
    type: 'Password',
    key: 'confirmPassword',
    fieldProps: {
      name: 'confirmPassword',
      label: 'confirm password',
      variant: 'outlined',
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
