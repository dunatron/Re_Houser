import { useState } from 'react';
import EmailInput from '@/Components/Inputs/Email';
import { Button, Typography } from '@material-ui/core';
import { toast } from 'react-toastify';
import { uuid } from 'uuidv4';
import Alert from '@material-ui/lab/Alert';
import { INVITE_USER_MUTATION } from '@/Gql/mutations';
import { useMutation } from '@apollo/client';

export default function InviteUser(props) {
  const [email, setEmail] = useState('');
  const [toastId, setToastId] = useState(uuid());

  const [inviteUser, { data, loading, error }] = useMutation(
    INVITE_USER_MUTATION
  );

  const handleInviteClick = e => {
    // toast(<Alert>TESTING</Alert>);
    inviteUser({
      variables: {
        data: {
          email: email,
          subUrl: '/tenant',
          message: 'A custom message from Invite User on FE',
        },
      },
    });
    toast.info(
      <Typography style={{ whiteSpace: 'pre-line' }}>
        Inviting user to the platform {'\n'}
        Email: {email}
      </Typography>,
      { toastId: toastId, closeOnClick: false }
    );
  };

  const handleOnComplete = data => {
    // update the toast? maybe just send a new one instead. they could close it
    console.log('SOME DATA BACK => ', data);
    toast.update(toastId, {
      type: toast.TYPE.SUCCESS,
      closeOnClick: true,
      render: <div>{JSON.stringify(data, null, 2)}</div>,
    });
    setToastId(uuid());
  };

  const handleEmailInputChange = e => setEmail(e.target.value);

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
        <Button onClick={handleOnComplete}>False COmplete</Button>
      </div>
    </div>
  );
}
