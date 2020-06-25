import React, { useState, useEffect } from 'react';

import {
  AppBar,
  Tooltip,
  IconButton,
  Toolbar,
  Typography,
  Slide,
  useScrollTrigger,
} from '@material-ui/core';

import { useRouter } from 'next/router';
import useStyles from './useStyles';
import useCurrentScrollTop from '../../lib/hooks/useCurrentScrollTop';

//icons
import DashboardIcon from '../../styles/icons/DashboardIcon';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const AppMenuBar = props => {
  // const { container, loadingUser, me } = props;
  const topPos = useCurrentScrollTop();
  const noTransparency = topPos > 10 ? true : false;
  const { container, appData, toggleTheme, setTheme } = props;
  const { currentUser } = appData;

  const me = currentUser.data ? currentUser.data.me : null;
  const router = useRouter();
  const classes = useStyles({
    noTransparency: noTransparency,
  });
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const pathParts = router.pathname.split('/');
  const formattedPathParts = pathParts.filter(part => part !== '');

  const routeToClickedPart = partIndex => {
    const newRoute = formattedPathParts.reduce((acc, part, idx) => {
      if (idx + 1 === formattedPathParts.length) return acc;
      if (idx > partIndex) return acc; // shouldnt add any more than where we are going
      if (idx === partIndex) {
        return acc + part;
      }
      return acc + part + '/';
    }, '/');
    router.push({
      pathname: newRoute,
      query: router.query,
    });
  };

  const handleGoBackToPreviousPage = () => {
    if (formattedPathParts.length === 0) return;
    router.back();
  };

  return (
    <HideOnScroll {...props}>
      <AppBar
        position="fixed"
        className={classes.appBar}
        elevation={noTransparency ? 4 : 0}>
        <Toolbar disableGutters={true} variant="regular">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerToggle}
            className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          {formattedPathParts.length > 0 && (
            <IconButton onClick={handleGoBackToPreviousPage}>
              <ArrowBackIcon />
            </IconButton>
          )}
          {formattedPathParts.length > 0 && (
            <>
              {formattedPathParts.map((urlPart, idx) => {
                const isLastPart =
                  idx + 1 === formattedPathParts.length ? true : false;
                return (
                  <Typography
                    key={idx}
                    variant="h6"
                    className={!isLastPart ? classes.routeablePart : null}
                    noWrap
                    onClick={() => {
                      !isLastPart ? routeToClickedPart(idx) : null;
                    }}>
                    {urlPart}
                    {!isLastPart && '/'}
                  </Typography>
                );
              })}
            </>
          )}
          <div
            style={{
              position: 'absolute',
              right: '16px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}>
            {/* <ThemePicker setTheme={setTheme} /> */}

            <Tooltip title="toggle app theme">
              <IconButton
                onClick={() => toggleTheme()}
                color="inherit"
                aria-label="toggle Theme"
                edge="end">
                <Brightness7Icon />
              </IconButton>
            </Tooltip>
            <Tooltip title="go to Dashboard">
              <IconButton
                onClick={() => {
                  router.push('/dashboard');
                }}
                color="inherit"
                aria-label="go to dashboard"
                edge="end">
                <DashboardIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default AppMenuBar;
