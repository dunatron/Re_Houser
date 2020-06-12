import { useState, useEffect } from 'react';

const getTopScrollPosition = () =>
  document.documentElement.scrollTop || document.body.scrollTop;

function useCurrentScrollTop() {
  // save current window width in the state object
  let [top, setTop] = useState(getTopScrollPosition());

  useEffect(() => {
    const resizeListener = event => {
      setTop(getTopScrollPosition());
    };
    // set resize listener
    window.addEventListener('scroll', resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('scroll', resizeListener);
    };
  }, []);

  return top;
}

export default useCurrentScrollTop;
