import { useState } from 'react';
import FormCreator from '../Forms/FormCreator';
import CONTACT_FORM_CONF from '../../lib/configs/contactFormConf';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import { Typography, Button } from '@material-ui/core';
import { CEO_DETAILS } from '../../config';
import { useMutation } from '@apollo/client';
import { CREATE_CONTACT_FORM_MUTATION } from '../../graphql/mutations';
import Error from '../ErrorMessage';
import Loading from '../Loader';
import { toast } from 'react-toastify';

const ContactForm = () => {
  const [sent, setSent] = useState(false);
  const [createContactForm, { data, loading, error }] = useMutation(
    CREATE_CONTACT_FORM_MUTATION,
    {
      onCompleted: d => {
        toast.success(
          <div>
            <p>{d.createContactForm.message}</p>
          </div>
        );
        setSent(true);
      },
    }
  );
  const handleSubmit = data => {
    createContactForm({
      variables: {
        ...data,
      },
    });
  };

  if (sent)
    return (
      <div>
        <Typography gutterBottom>{data.message}</Typography>
        <Button onClick={() => setSent(true)}>Send More</Button>
      </div>
    );

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '8px',
            marginRight: '8px',
            justifyContent: 'center',
          }}>
          <PhoneIcon style={{ marginRight: '4px' }} />
          <Typography>{CEO_DETAILS.phone}</Typography>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '8px',
          }}>
          <EmailIcon style={{ marginRight: '4px' }} />{' '}
          <Typography>{CEO_DETAILS.email}</Typography>
        </div>
      </div>
      <FormCreator
        title="Contact form"
        createText="Submit contact form"
        error={error}
        posting={loading}
        config={CONTACT_FORM_CONF}
        isNew={true}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ContactForm;
