import { useEffect } from 'react';

const handleDefaultDrop = e => {
  e = e || event;
  e.preventDefault();
};

function useDisableDrop() {
  useEffect(() => {
    window.addEventListener('drop', handleDefaultDrop, false);
    return () => {
      window.removeEventListener('drop', handleDefaultDrop);
    };
  }, []);
  return null;
}

export default useDisableDrop;
