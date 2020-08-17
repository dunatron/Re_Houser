// import PropertiesList from "../components/PropertiesList/index"
import PropertySearch from '../components/PropertySearch/index';
import NoSSR from 'react-no-ssr';
import PageHeader from '../components/PageHeader';
import { Typography } from '@material-ui/core';
import ContactForm from '../components/Contact/ContactForm';

const LookPage = props => {
  const {
    appData: { currentUser },
  } = props;

  return (
    <>
      <PageHeader
        title="Contact"
        id="contact-page"
        intro="Contact us"
        metaData={{
          title: 'Contact Rehouser Team',
          content:
            'Contact the rehouser team who will be in touch with promptly',
        }}
      />
      <ContactForm />
    </>
  );
};

export default LookPage;
