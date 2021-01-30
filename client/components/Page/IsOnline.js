import { useState, useEffect } from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@/Components/Alert';

/**
 * Checks and keeps checking if our service worker is connected to the internet
 */

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const IsOnline = () => {
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setConnected(window.navigator.onLine);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Snackbar
        open={!connected}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message="No connection found, working offline"
      />
    </>
  );
};

export default IsOnline;
