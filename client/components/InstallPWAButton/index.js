import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import { toast } from 'react-toastify';

// https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent
const InstallPWAButton = () => {
  const [appInstalled, setAppInstalled] = useState(false);
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const interceptBeforeInstallHandler = e => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener(
      'beforeinstallprompt',
      interceptBeforeInstallHandler
    );

    return () => window.removeEventListener('transitionend', handler);
  }, []);

  // Note: could be removed/changed
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/appinstalled_event
  useEffect(() => {
    const appinstalledListnerHandler = e => {
      //   e.preventDefault();
      toast.success(
        <Typography variant="h5">Welcome to the Rehouser PWA</Typography>
      );
      setAppInstalled(true);
    };
    window.addEventListener('appinstalled', appinstalledListnerHandler);

    return () => window.removeEventListener('transitionend', handler);
  }, []);

  const onClick = evt => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return null;
  }
  if (appInstalled) {
    return null;
  }
  return (
    <Button
      variant="outlined"
      id="install_button"
      aria-label="Install app"
      title="Install app"
      startIcon={<GetAppIcon />}
      onClick={onClick}>
      Install Rehsouser Web App
    </Button>
  );
};

export default InstallPWAButton;
