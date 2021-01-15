const CHARGE_WALLET_FORM_CONF = [
  // amount, reason, description
  {
    type: 'Money',
    key: 'amount',
    fieldProps: {
      label: 'Amount',
      name: 'amount',
      variant: 'standard',
    },
    refConf: {
      required: {
        value: true,
        message: 'You must specify the amount in dollars',
      },
    },
  },
  {
    type: 'SelectOneEnum',
    __type: 'ChargeReason',
    key: 'reason',
    fieldProps: {
      label: 'reason',
      name: 'reason',
      variant: 'standard',
    },
    refConf: {
      required: {
        value: true,
        message: 'You need nto select a reason why the lease is being charged',
      },
    },
  },
  {
    type: 'String',
    key: 'description',
    fieldProps: {
      label: 'description',
      name: 'description',
      variant: 'standard',
    },
    refConf: {
      required: {
        value: true,
        message: 'You need to specify a description',
      },
    },
  },
];

export { CHARGE_WALLET_FORM_CONF };
export default CHARGE_WALLET_FORM_CONF;
