import PageHeader from '../components/PageHeader';
import ContactForm from '../components/Contact/ContactForm';

const ContactPage = props => {
  const {
    appData: { currentUser },
  } = props;

  return (
    <>
      <PageHeader
        title="Contact"
        id="contact-page"
        metaData={{
          title: 'Contact Rehouser Support',
          content:
            'Contact the rehouser support team who will be in touch with you promptly',
        }}
      />
      <ContactForm />
    </>
  );
};

export default ContactPage;
