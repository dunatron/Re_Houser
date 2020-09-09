import PropTypes from 'prop-types';
import PageHeader from '../components/PageHeader';
import ContactForm from '../components/Contact/ContactForm';

const ContactPage = () => {
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

ContactPage.propTypes = {};

export default ContactPage;
