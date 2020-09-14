import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';

import {
  AppBar,
  Tooltip,
  IconButton,
  Toolbar,
  Typography,
  Slide,
  useScrollTrigger,
} from '@material-ui/core';
import clsx from 'clsx';

import { useRouter } from 'next/router';
import useStyles from './useStyles';
import useCurrentScrollTop from '../../lib/hooks/useCurrentScrollTop';

import { store } from '../../store';

//icons
import DashboardIcon from '../../styles/icons/DashboardIcon';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';

// account menu
import AccountMenu from './AccountMenu';

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

HideOnScroll.propTypes = {
  children: PropTypes.any.isRequired,
  window: PropTypes.func.isRequired,
};

const AppMenuBar = props => {
  const globalStore = useContext(store);
  const { dispatch, state } = globalStore;
  const topPos = useCurrentScrollTop();
  const noTransparency = topPos > 10 ? true : false;
  const { container, appData } = props;
  const { currentUser } = appData;

  const me = currentUser.data ? currentUser.data.me : null;
  const router = useRouter();
  // i think maybe we do this as an inline style...
  // or use like clsx and actually have the classes you clown
  const classes = useStyles({
    noTransparency: noTransparency,
  });

  const barClasses = clsx(
    classes.rehouserAppBar,
    noTransparency ? classes.appBarSolid : classes.appBarTransparent
  );

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

  console.log('render: AppMenuBar');

  return (
    <HideOnScroll {...props}>
      <AppBar
        position="fixed"
        className={barClasses}
        elevation={noTransparency ? 4 : 0}>
        <Toolbar disableGutters={true} variant="regular">
          <IconButton
            // color="inherit"
            color="secondary"
            aria-label="open drawer"
            edge="start"
            // onClick={props.handleDrawerToggle}
            onClick={() =>
              dispatch({
                type: 'updateState',
                payload: {
                  sideBarOpen: true,
                },
              })
            }
            className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          {formattedPathParts.length > 0 && (
            <IconButton onClick={handleGoBackToPreviousPage}>
              <ArrowBackIcon fontSize="large" />
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
            <Tooltip title="Search available properties">
              <IconButton
                color="secondary"
                variant="contained"
                onClick={() =>
                  router.push({
                    pathname: '/property-search',
                  })
                }>
                <SearchIcon />
              </IconButton>
            </Tooltip>

            <AccountMenu me={me} />
          </div>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

AppMenuBar.propTypes = {
  appData: PropTypes.any.isRequired,
  container: PropTypes.any.isRequired,
};

export default AppMenuBar;
