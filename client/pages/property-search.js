// import PropertiesList from "../components/PropertiesList/index"
import PropertySearch from '../components/PropertySearch/index';
import NoSSR from 'react-no-ssr';
import PageHeader from '../components/PageHeader';
import { Typography } from '@material-ui/core';

const LookPage = props => {
  const {
    appData: { currentUser },
  } = props;

  return (
    <>
      <PageHeader
        title="Property search"
        id="property-search"
        intro="Browse our range of available rental properties from your at-home comforts. 
        We are always working on new listings, so make sure to come back for a visit every once and a while."
        metaData={{
          title: 'Look for properties',
          content: 'Look or search for rental properties available in NZ',
        }}
        children={[
          <Typography gutterBottom>
            See something you like? Click "Get viewing time" and one of our
            agents will be in touch with you shortly.
          </Typography>,
        ]}
      />
      <NoSSR>
        <PropertySearch />
      </NoSSR>
    </>
  );
};

export default LookPage;
