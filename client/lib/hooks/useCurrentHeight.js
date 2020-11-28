import { useState, useEffect } from 'react';
import isBrowser from '@/Lib/isBrowser';

// const getHeight = () =>
//   window.innerHeight ||
//   document.documentElement.clientHeight ||
//   document.body.clientHeight;

const getHeight = () =>
  document.documentElement?.clientHeight || window.innerHeight;
function useCurrentHeight() {
  // save current window height in the state object
  let [height, setHeight] = useState(isBrowser() ? getHeight() : '100vh');

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
  useEffect(() => {
    const resizeListener = () => {
      // change width from the state object
      setHeight(getHeight());
    };
    // set resize listener
    window.addEventListener('resize', resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return height;
}

export default useCurrentHeight;
