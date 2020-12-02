import { useEffect } from 'react';

const handleDefaultDragover = e => {
  e = e || event;
  e.preventDefault();
};

function useDisableDragover() {
  useEffect(() => {
    window.addEventListener('dragover', handleDefaultDragover, false);
    return () => {
      window.removeEventListener('dragover', handleDefaultDragover);
    };
  }, []);
  return null;
}

export default useDisableDragover;
