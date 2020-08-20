import FormCreator from '../Forms/FormCreator';
import CONTACT_FORM_CONF from '../../lib/configs/contactFormConf';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import { Typography } from '@material-ui/core';
import { CEO_DETAILS } from '../../config';

const ContactForm = () => {
  const handleSubmit = data => {
    alert(
      'ToDO create the submit form on the server and require a recaptcha token'
    );
  };
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
        config={CONTACT_FORM_CONF}
        isNew={true}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ContactForm;
