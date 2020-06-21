import ComingSoon from '../../components/ComingSoon';
import ContactComponent from '../../components/Contact';
import { Typography } from '@material-ui/core';
import PageHeader from '../../components/PageHeader';

const ContactInfoPage = () => {
  return (
    <>
      <PageHeader
        title="Contact"
        intro="Want to contact us? you will find any contact information below"
        metaData={{
          title: 'Contact us',
          content:
            'Contact details including physical address, mailing address, email address and phone details for our offices',
        }}
      />
      <ContactComponent />
    </>
  );
};

export default ContactInfoPage;
