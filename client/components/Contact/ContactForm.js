import FormCreator from '../Forms/FormCreator';
import CONTACT_FORM_CONF from '../../lib/configs/contactFormConf';

const ContactForm = () => {
  return (
    <FormCreator
      title="Contact form"
      createText="Submit contact form"
      config={CONTACT_FORM_CONF}
      isNew={true}
    />
  );
};

// title,
// data,
// config,
// isNew,
// posting,
// error,
// fileRemovedFromServer,
// updateCacheOnRemovedFile,
// forceFormUpdates,
// createText,
// updateText,
// refetchQueries,

export default ContactForm;
