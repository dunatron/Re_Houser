import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChatsBar from '../ChatsBar';
import { SITE_NAME } from '../../lib/const';
import { useRouter } from 'next/router';
import useStyles from './useStyles';
import DashboardIcon from '../../styles/icons/DashboardIcon';
import { Tooltip } from '@material-ui/core';

import Link from 'next/link';
import Sidebar from '../Sidebar';

function MaterialPage(props) {
  // const { container, loadingUser, me } = props;
  const { container, appData } = props;
  const { currentUser } = appData;

  const me = currentUser.data ? currentUser.data.me : null;
  const router = useRouter();
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  console.log('Ok the materialPage Props => ', props);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.logoContainer}>
        <ListItem>
          <Link href="/">
            {/* <a className={classes.logo}>{SITE_NAME}</a> */}
            {/* <img src="/images/rehouser_logo.png" width="200px" alt="my image" /> */}
            {/* Space to serve image to the left with text. Note make image wide with this space, logo in it and slogan to the right */}
            <img src="/images/rehouser_logo.png" width="100px" alt="my image" />
          </Link>
        </ListItem>
      </div>
      <Divider />
      <Sidebar loadingUser={currentUser.loading} me={me} />
    </div>
  );

  console.log('router pathname => ', router.pathname);
  console.log('router  => ', router);

  const pathParts = router.pathname.split('/');
  const formattedPathParts = pathParts.filter(part => part !== '');

  const routeToClickedPart = partIndex => {
    const newRoute = formattedPathParts.reduce((acc, part, idx) => {
      console.log('acc => ', acc);
      console.log('part => ', part);
      console.log('idx => ', idx);
      if (idx + 1 === formattedPathParts.length) return acc;
      return acc + part + '/';
    }, '/');
    console.log('New route =>', newRoute);
    router.push(newRoute);
  };

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
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}>
              <MenuIcon />
            </IconButton>
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

            <div style={{ position: 'absolute', right: '16px' }}>
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

          {/* {props.children} */}
          {children}
        </main>
        <ChatsBar />
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
