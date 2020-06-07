import ComingSoon from '../../components/ComingSoon';
import ContactComponent from '../../components/Contact';
import { Typography } from '@material-ui/core';

const ContactInfoPage = () => {
  return (
    <>
      <Typography variant="h1">Contact</Typography>
      <Typography variant="body1" gutterBottom>
        Want to contact us? you will find any contact information below
      </Typography>
      <ContactComponent />
    </>
  );
};

export default ContactInfoPage;
