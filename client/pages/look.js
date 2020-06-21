// import PropertiesList from "../components/PropertiesList/index"
import PropertySearch from '../components/PropertySearch/index';
import NoSSR from 'react-no-ssr';
import PageHeader from '../components/PageHeader';

const LookPage = props => {
  const {
    appData: { currentUser },
  } = props;
  return (
    <>
      <PageHeader
        title="Property search"
        intro="This is where you can search for rehouser properties that are on the market and start the creation of an application to lease"
        metaData={{
          title: 'Look for properties',
          content: 'Look or search for rental properties available in NZ',
        }}
      />
      <NoSSR>
        <PropertySearch />
      </NoSSR>
    </>
  );
};

export default LookPage;
