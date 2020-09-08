import { useState, useContext, useEffect } from 'react';
import useStyles from './useStyles';
import { ListItem, Divider, Drawer, Hidden } from '@material-ui/core';

import Link from 'next/link';
import Sidebar from '../Sidebar';
import { store } from '../../store';

const AppDrawer = ({ me }) => {
  const globalStore = useContext(store);
  const { dispatch, state } = globalStore;
  const classes = useStyles();

  const handleDrawerToggle = () => {
    // setMobileOpen(!mobileOpen);
    dispatch({
      type: 'updateState',
      payload: {
        sideBarOpen: false,
      },
    });
  };

  const drawer = () => {
    return (
      <>
        <div className={classes.logoContainer}>
          <ListItem
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Link href="/">
              <img src="/images/svg/ReHouse_main_logo.svg" alt="my image" />
            </Link>
          </ListItem>
        </div>
        {/* <Divider /> */}
        <Sidebar loadingUser={false} me={me} />
      </>
    );
  };

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden lgUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={'left'}
          open={state.sideBarOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}>
          {drawer()}
        </Drawer>
      </Hidden>
      <Hidden mdDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open={true}>
          {drawer()}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default AppDrawer;
