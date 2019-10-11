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

import Link from 'next/link';
import Sidebar from '../Sidebar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: theme.sideBarWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: theme.sideBarWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${theme.sideBarWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  logoContainer: {},
  logo: {
    color: theme.palette.primary.main,
    fontSize: '36px',
    display: 'block',
    width: '100%',
    textAlign: 'center',
  },
  drawerPaper: {
    width: theme.sideBarWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    maxWidth: '100%',
    [theme.breakpoints.up('sm')]: {
      // maxWidth: 'calc(100% - 240px)',
      maxWidth: `calc(100% - ${theme.sideBarWidth}px)`,
    },
  },
}));

function ResponsiveDrawer(props) {
  console.log('Each Material Page gets these props => ', props);
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.logoContainer}>
        <ListItem>
          <Link href="/">
            <a className={classes.logo}>{SITE_NAME}</a>
          </Link>
        </ListItem>
      </div>
      <Divider />
      <Sidebar />
    </div>
  );

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
            <Typography variant="h6" noWrap></Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
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
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open>
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content} id="main-content">
          <div className={classes.toolbar} />

          {props.children}
        </main>
        <ChatsBar />
      </div>
    </>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(
    typeof Element === 'undefined' ? Object : Element
  ),
};

export default ResponsiveDrawer;
