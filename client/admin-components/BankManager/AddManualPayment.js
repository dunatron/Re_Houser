import FormCreator from '@/Components/Forms/FormCreator';
import { useMutation } from '@apollo/client';
import { ADD_BANK_TRANSFER_TO_LEASE_MUTATION } from '@/Gql/mutations';

/**
 * ToDo. Create two new Types in FormCreator. SelectOne, selectMultiple.
 * formCreator will accept new prop {selectOptionTypes<Array>}
 * then on the type for SelectOne it will take a props optionType={"lesseesOptions"} and will take the options from the key
 * options will have standard id, label, and value. make value. make the id work for selected and default etc
 */
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

const AddManualPayment = ({ lease }) => {
  const lesseeUserIdOptions = lease.lessees.map((lessee, idx) => ({
    label: `${lessee.user.email}`,
    value: lessee.user.id,
  }));

  console.log('lesseeUserIdOptions => ', lesseeUserIdOptions);

  const handleFormSubmit = data => {
    console.log('Submitted Data => ', data);
    console.log('amount in cents => ', parseInt(data.amount));

    // addPayment({
    //   variables: {
    //     bankRef: lease.bankRef,
    //     data: {
    //       lease: lease,
    //       lessees: lesseeUsers,
    //       amount: data.amount,
    //       userId: data.userId,
    //       bankNumber: data.bankaccount.bankNumber,
    //       bankBranch: data.bankaccount.branchNumber,
    //       bankAccount: data.bankaccount.accountNumber,
    //       bankSuffix: data.bankaccount.suffix,
    //       bankRef: data.bankRef,
    //       type: data.type,
    //       reason: data.reason,
    //       leaseId: lease.id,
    //       propertyId: lease.property ? lease.property.id : null,
    //       description: 'A manual payment added from a bank transfer',
    //     },
    //   },
    // });

    // amount: "$2,342"
    // bankRef: "lkZfcVA"
    // bankaccount: {bankNumber: "23", branchNumber: "4234", accountNumber: "2342342", suffix: "342"}
    // particulars: "344"
    // reason: "BOND"
    // type: "MANUAL_BANK_TRANSFER"
  };

  const [addPayment, { data, loading, error }] = useMutation(
    ADD_BANK_TRANSFER_TO_LEASE_MUTATION
    // {
    //   refetchQueries: [{ query: CURRENT_USER_QUERY }],
    // }
  );
  return (
    <div>
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
