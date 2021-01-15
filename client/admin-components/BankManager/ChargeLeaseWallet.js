import { useMutation } from '@apollo/client';
import { UPDATE_WALLET_MUTATION } from '@/Gql/mutations';
import { CHARGE_WALLET_FORM_CONF } from '@/Lib/configs/forms/chargeWalletForm';
import FormCreator from '@/Components/Forms/FormCreator';
import { formatCentsToDollars } from '@/Lib/formatCentsToDollars';

import { Box, Typography, Button } from '@material-ui/core';
import { toast } from 'react-toastify';

import Error from '@/Components/ErrorMessage';

const ChargeLeaseWallet = ({ lease, onCompleted }) => {
  const { wallet } = lease;

  const onUpdateCompleted = data => {
    toast.success(
      <Box>
        <Typography variant="body1">Charge added to lease wallet.</Typography>
        <Typography variant="body1">
          New Balance: {formatCentsToDollars(data.updateWallet.amount)}
        </Typography>
      </Box>
    );
    onCompleted(data);
  };

  const [updateWallet, { loading, error, data }] = useMutation(
    UPDATE_WALLET_MUTATION,
    {
      onCompleted: onUpdateCompleted,
    }
  );

  const handleFormSubmit = data => {
    console.log('Form data => ', data);
    updateWallet({
      variables: {
        data: {
          charges: {
            create: [
              {
                amount: data.amount,
                reason: data.reason,
                description: data.description,
              },
            ],
          },
        },
        where: {
          id: wallet.id,
        },
      },
    });
  };

  return (
    <div>
      <Error error={error} />
      <FormCreator
        posting={loading}
        error={error}
        isNew={true}
        title="Add Charge"
        onSubmit={handleFormSubmit}
        config={CHARGE_WALLET_FORM_CONF}
      />
    </div>
  );
};

export default ChargeLeaseWallet;
