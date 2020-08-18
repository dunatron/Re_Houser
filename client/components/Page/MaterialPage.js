import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ListItem, Divider, Drawer, Hidden } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import ChatsBar from '../RehouserChat/ChatsBar';
import useStyles from './useStyles';
import Link from 'next/link';
import Sidebar from '../Sidebar';

import AppMenuBar from './AppMenuBar';
import Footer from '../Footer';
import LoginModal from './LoginModal';

function MaterialPage(props) {
  const theme = useTheme();
  const classes = useStyles();
  const { container, appData, toggleTheme, setTheme } = props;
  const { currentUser } = appData;

  const me = currentUser.data ? currentUser.data.me : null;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <div className={classes.logoContainer}>
        <ListItem>
          <Link href="/">
            {/* Space to serve image to the left with text. Note make image wide with this space, logo in it and slogan to the right */}
            <img src="/images/rehouser_logo.png" width="100px" alt="my image" />
          </Link>
        </ListItem>
      </div>
      <Divider />
      <Sidebar loadingUser={currentUser.loading} me={me} />
    </>
  );

  const children = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        appData: {
          ...props.appData, // has other shit we dont want
        },
      });
    }
    return child;
  });

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        {/* Header */}
        <AppMenuBar {...props} handleDrawerToggle={handleDrawerToggle} />
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden lgUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              // open={true}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}>
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden mdDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open={true}>
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content} id="main-content">
          <div className={classes.toolbar} />
          {children}
          <Footer />
        </main>
        {me && <ChatsBar me={me} />}
        <LoginModal />
      </div>
    </>
  );
}

MaterialPage.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(
    typeof Element === 'undefined' ? Object : Element
  ),
};

export default MaterialPage;
