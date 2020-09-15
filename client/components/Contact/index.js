import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Map from '@/Components/Map';
import OfficeLocation from './OfficeLocation';
import ContactForm from './ContactForm';

const useStyles = makeStyles(theme => ({
  root: {
    // display: 'flex',
  },
}));

const ContactComponent = () => {
  return (
    <div>
      <div></div>

      <OfficeLocation
        name="Christchurch office"
        physicalLines={[
          'Levels 5 & 6,',
          '5 Monowai road,',
          'Ravensbourne, Dunedin, 6011',
          '+64 555 555',
        ]}
        mailLines={[
          'PO Box 55555,',
          '5 Monowai road,',
          'Ravensbourne, Dunedin, 6011',
        ]}
        map={{
          center: {
            lat: -43.5320264,
            lng: 172.6328503,
          },
        }}
      />
      <OfficeLocation
        name="Dunedin office"
        physicalLines={[
          'Levels 5 & 6,',
          '5 Monowai road,',
          'Ravensbourne, Dunedin, 6011',
          '+64 555 555',
        ]}
        // mailLines={[
        //   'PO Box 55555,',
        //   '5 Monowai road,',
        //   'Ravensbourne, Dunedin, 6011',
        // ]}
        map={{
          center: {
            lat: -45.86423299999999,
            lng: 170.548709,
          },
        }}
      />
      <ContactForm />
    </div>
  );
};

export default ContactComponent;
