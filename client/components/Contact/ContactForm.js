import { useState } from 'react';
import FormCreator from '@/Components/Forms/FormCreator';
import CONTACT_FORM_CONF from '@/Lib/configs/contactFormConf';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import { Typography, Button } from '@material-ui/core';
import { CEO_DETAILS } from '../../config';
import { useMutation } from '@apollo/client';
import { CREATE_CONTACT_FORM_MUTATION } from '@/Gql/mutations';
import { toast } from 'react-toastify';
import Card from '@/Styles/Card';
import FlexLayout from '@/Styles/layouts/FlexLayout';

const ContactForm = ({ createText }) => {
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
        <Typography gutterBottom>{data.createContactForm.message}</Typography>
        <Button onClick={() => setSent(false)}>Send More</Button>
      </div>
    );

  return (
    <>
      <Card
        style={{
          display: 'flex',
          alignItems: 'center',
          margin: '16px 0',
        }}>
        <FlexLayout>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              // marginBottom: '8px',
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
              // marginBottom: '8px',
            }}>
            <EmailIcon style={{ marginRight: '4px' }} />{' '}
            <Typography>{CEO_DETAILS.email}</Typography>
          </div>
        </FlexLayout>
      </Card>
      <FormCreator
        title="Contact form"
        createText={createText ? createText : 'Submit contact form'}
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
