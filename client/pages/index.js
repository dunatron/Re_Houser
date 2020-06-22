import React, { Component } from 'react';
import Banner from '../components/Banner';

import { Button } from '@material-ui/core';
import ChangeRouteButton from '../components/Routes/ChangeRouteButton';

import LookPage from './look';

const HomePage = props => {
  const {
    appData: { currentUser },
  } = props;
  console.log('Look page props => ', props);

  if (typeof window !== 'undefined') {
    // client-side-only code
    return null;
  }
  const [isComponentMounted, setIsComponentMounted] = useState(false);

  useEffect(() => setIsComponentMounted(true), []);

  if (!isComponentMounted) {
    return null;
  }
  return (
    <div>
      <Banner imageSrc="images/banners/home-page-banner.jpg">
        <ChangeRouteButton
          title="Free Appraisal"
          variant="contained"
          color="secondary"
          route="/freeappraisal"
          query=""
        />
      </Banner>
      <LookPage {...props} />
    </div>
  ); // Notice its a page so we need to spread page props.
};

// const HomePage = props => {
//   const {
//     appData: { currentUser },
//   } = props;
//   return <LookPage {...props} />; // Notice its a page so we need to spread page props.
// };
export default HomePage;
