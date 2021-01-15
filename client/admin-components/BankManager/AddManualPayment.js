import FormCreator from '@/Components/Forms/FormCreator';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BANK_TRANSFER_TO_LEASE_MUTATION } from '@/Gql/mutations';
import { toast } from 'react-toastify';
import { Box, Typography, FormControlLabel, Switch } from '@material-ui/core';
import { formatCentsToDollars } from '@/Lib/formatCentsToDollars';

const MANUALLY_ADD_BANK_TRANSFER_FORM_CONF = [
  {
    type: 'Header',
    fieldProps: { label: 'Add Payment Form', variant: 'body2' },
  },
  {
    type: 'String',
    key: 'bankRef',
    fieldProps: {
      label: 'bankRef ',
      name: 'bankRef',
      variant: 'standard',
      disabled: true,
    },
    refConf: {
      required: {
        value: true,
        message: 'The banking ref for the lease',
      },
    },
  },
  {
    type: 'BankAccount',
    key: 'bankaccount',
    fieldProps: {
      label: 'bankaccount ',
      name: 'bankaccount',
      variant: 'standard',
      disabled: true,
    },
    refConf: {
      required: {
        value: true,
        message: 'The banking ref for the lease',
      },
    },
  },
  {
    type: 'Money',
    key: 'amount',
    fieldProps: {
      label: 'amount ',
      name: 'amount',
      variant: 'standard',
    },
    refConf: {
      required: {
        value: true,
        message: 'The amount the person paid with the bank transfer',
      },
    },
  },
  {
    type: 'String',
    key: 'particulars',
    fieldProps: {
      label: 'particulars ',
      name: 'particulars',
      variant: 'standard',
    },
    refConf: {
      required: {
        value: true,
        message: 'particulars. Note not storing this anywhere',
      },
    },
  },
  {
    type: 'SelectOneEnum',
    key: 'type',
    __type: 'PaymentType',
    fieldProps: {
      label: 'type ',
      name: 'type',
      variant: 'standard',
    },
    refConf: {
      required: {
        value: true,
        message: 'particulars. Note not storing this anywhere',
      },
    },
  },
  {
    type: 'SelectOne',
    optionKey: 'lesseesOptions',
    key: 'userId',
    fieldProps: {
      label: 'userId',
      name: 'userId',
      variant: 'standard',
    },
    refConf: {
      required: {
        value: true,
        message: 'particulars. Note not storing this anywhere',
      },
    },
  },
  {
    type: 'SelectOneEnum',
    key: 'reason',
    __type: 'PaymentReason',
    fieldProps: {
      label: 'reason ',
      name: 'reason',
      variant: 'standard',
    },
    refConf: {
      required: {
        value: true,
        message: 'particulars. Note not storing this anywhere',
      },
    },
  },
];

const AddManualPayment = ({ lease, onCompleted }) => {
  const [keepOpen, setKeepOpen] = useState(false);
  const lesseeUserIdOptions = lease.lessees.map((lessee, idx) => ({
    label: `${lessee.user.email}`,
    value: lessee.user.id,
  }));

  const handleSwitchChange = event => setKeepOpen(event.target.checked);

  const onPaymentCompleted = data => {
    toast.success(
      <Box>
        <Typography variant="body1">Payment added to lease wallet.</Typography>
        <Typography variant="body1">
          New Balance:{' '}
          {formatCentsToDollars(data.addBankTransferToLease.wallet.amount)}
        </Typography>
      </Box>
    );
    if (!keepOpen) {
      onCompleted(data); // essentially closes the modal. bad names and places for things sorry. in a rush
    }
  };

  const [addPayment, { data, loading, error }] = useMutation(
    ADD_BANK_TRANSFER_TO_LEASE_MUTATION,
    {
      onCompleted: onPaymentCompleted,
    }
  );

  const handleFormSubmit = data => {
    addPayment({
      variables: {
        bankRef: lease.bankRef,
        data: {
          amount: data.amount,
          userId: data.userId,
          bankNumber: data.bankaccount.bankNumber,
          bankBranch: data.bankaccount.branchNumber,
          bankAccount: data.bankaccount.accountNumber,
          bankSuffix: data.bankaccount.suffix,
          bankRef: data.bankRef,
          type: data.type,
          reason: data.reason,
          leaseId: lease.id,
          propertyId: lease.property ? lease.property.id : null,
          description: 'A manual payment added from a bank transfer',
        },
      },
    });
  };

  return (
    <div>
      <FormControlLabel
        control={
          <Switch
            checked={keepOpen}
            onChange={handleSwitchChange}
            name="keepOpen"
          />
        }
        label="Keep Open"
      />
      <FormCreator
        posting={loading}
        error={error}
        isNew={true}
        title="Add Payment"
        selectOptionTypes={{
          lesseesOptions: lesseeUserIdOptions,
        }}
        data={{
          bankRef: lease.bankRef,
          type: 'MANUAL_BANK_TRANSFER',
        }}
        onSubmit={handleFormSubmit}
        config={MANUALLY_ADD_BANK_TRANSFER_FORM_CONF}
      />
    </div>
  );
};

export default AddManualPayment;
