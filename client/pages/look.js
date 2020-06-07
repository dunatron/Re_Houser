// import PropertiesList from "../components/PropertiesList/index"
import PropertySearch from '../components/PropertySearch/index';
import NoSSR from 'react-no-ssr';
import Head from 'next/head';

// const LookPage = props => (
//   <div>
//     {/* <PropertiesList /> */}
//     <NoSSR>
//       <PropertySearch />
//     </NoSSR>
//   </div>
// );

{
  /* <meta name="description" content="Buy beautiful, high quality carpets for your home."/>
  <title>Beautiful, high quality carpets | CarpetCity</title> */
}

const LookPage = props => {
  const {
    appData: { currentUser },
  } = props;
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Look or search for rental properties available in NZ"
        />
        <title>Look for properties</title>
      </Head>
      {/* <PropertiesList /> */}

      <NoSSR>
        <PropertySearch />
      </NoSSR>
    </>
  );
};

export default LookPage;
