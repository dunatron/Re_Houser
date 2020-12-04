import { useState } from 'react';
import EmailInput from '@/Components/Inputs/Email';
import { Button, Typography } from '@material-ui/core';
import { toast } from 'react-toastify';
import { uuid } from 'uuidv4';
import Alert from '@material-ui/lab/Alert';
import { INVITE_USER_MUTATION } from '@/Gql/mutations';
import { useMutation } from '@apollo/client';

import Loader from '@/Components/Loader';
import Error from '@/Components/ErrorMessage';

export default function InviteUser({ message, subUrl }) {
  const [email, setEmail] = useState('');
  const [toastId, setToastId] = useState(uuid());

  const handleEmailInputChange = e => setEmail(e.target.value);

  const handleOnError = error => {
    toast.update(toastId, {
      type: toast.TYPE.SUCCESS,
      closeOnClick: true,
      render: <Error error={error} />,
    });
    setToastId(uuid());
  };

  const handleOnCompleted = data => {
    toast.update(toastId, {
      type: toast.TYPE.SUCCESS,
      closeOnClick: true,
      render: (
        <div>
          <Typography style={{ whiteSpace: 'pre-line' }}>
            {data.inviteUser.message}
          </Typography>
          {/* {JSON.stringify(data.inviteUser.data, null, 2)} */}
        </div>
      ),
    });
    setToastId(uuid());
  };

  const [inviteUser, { data, loading, error }] = useMutation(
    INVITE_USER_MUTATION,
    {
      onCompleted: handleOnCompleted,
      onError: handleOnError,
    }
  );

  const handleInviteClick = e => {
    inviteUser({
      variables: {
        data: {
          email: email,
          subUrl: subUrl,
          message: message,
        },
      },
    });
    toast.info(
      <Loader
        loading={loading}
        color="primary"
        text={`Inviting user to the platform ${'\n'} ${email}`}
      />,
      { toastId: toastId, closeOnClick: false }
    );
  };

  return (
    <div>
      <div>
        <EmailInput
          label="Invite to platform by Email"
          onChange={handleEmailInputChange}
        />
        <Button onClick={handleInviteClick} disabled={loading}>
          Invite
        </Button>
      </div>
    </div>
  );
}
