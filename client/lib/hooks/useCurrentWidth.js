// import { useState, useEffect } from 'react';
// import isBrowser from '@/Lib/isBrowser';

// const getWidth = () =>
//   window.innerWidth ||
//   document.documentElement.clientWidth ||
//   document.body.clientWidth;

// function useCurrentWidth() {
//   // save current window width in the state object
//   let [width, setWidth] = useState(isBrowser() ? getWidth() : '100%');

//   // in this case useEffect will execute only once because
//   // it does not have any dependencies.
//   useEffect(() => {
//     const resizeListener = () => {
//       // change width from the state object
//       setWidth(getWidth());
//     };
//     // set resize listener
//     window.addEventListener('resize', resizeListener);

//     // clean up function
//     return () => {
//       // remove resize listener
//       window.removeEventListener('resize', resizeListener);
//     };
//   }, []);

//   return width;
// }

// export default useCurrentWidth;

// import React from 'react';

// export default function useWindowSize() {
//   // if (typeof window !== "undefined") {
//   // return { width: 1200, height: 800 };
//   // }
//   const isSSR = typeof window !== 'undefined';
//   const [windowSize, setWindowSize] = React.useState({
//     width: isSSR ? 1200 : window.innerWidth,
//     height: isSSR ? 800 : window.innerHeight,
//   });

//   React.useEffect(() => {
//     window.addEventListener('resize', () => {
//       setWindowSize({ width: window.innerWidth, height: window.innerHeight });
//     });

//     return () => {
//       window.removeEventListener('resize', () => {
//         setWindowSize({ width: window.innerWidth, height: window.innerHeight });
//       });
//     };
//   }, []);
// }
import { useState, useEffect } from 'react';

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize.width;
}

export default useWindowSize;
