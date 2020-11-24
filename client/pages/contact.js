import PropTypes from 'prop-types';
import PageHeader from '@/Components/PageHeader';
import ContactForm from '@/Components/Contact/ContactForm';

const ContactPage = props => {
  console.log('props on contact page => ', props);
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
