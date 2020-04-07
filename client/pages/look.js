// import PropertiesList from "../components/PropertiesList/index"
import PropertySearch from '../components/PropertySearch/index';
import NoSSR from 'react-no-ssr';

// const LookPage = props => (
//   <div>
//     {/* <PropertiesList /> */}
//     <NoSSR>
//       <PropertySearch />
//     </NoSSR>
//   </div>
// );

const LookPage = props => {
  const {
    appData: { currentUser },
  } = props;
  return (
    <div>
      {/* <PropertiesList /> */}
      <NoSSR>
        <PropertySearch />
      </NoSSR>
    </div>
  );
};

export default LookPage;
