import PropTypes from 'prop-types';
import { Fragment, useContext, useEffect } from 'react';
import { store } from '@/Store/index';
import Router from 'next/router';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { withStyles, makeStyles } from '@material-ui/core/styles';

// material
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  Avatar,
} from '@material-ui/core';

// nav config function
import navConfig from './navConf';

// styles
import useSideBarStyles from './useStyles';

const StyledListItem = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
  selected: {
    background: 'black',
  },
})(ListItem);

const handleLink = (route = '/', query = {}) => {
  Router.push({
    pathname: route,
    query: query,
  }).then(() => window.scrollTo(0, 0));
};

const Nav = props => {
  const router = useRouter();
  const { loadingUser, me } = props;
  const NAV_CONF = navConfig(me, loadingUser, router.pathname);
  const classes = useSideBarStyles();

  console.log('render: SideBar props =>', props);
  useEffect(() => {
    console.log('render: SideBar useEffect');
    return () => {
      console.log('render: SideBar useEffect cleanup');
    };
  }, [router.pathname]);
  return (
    <div>
      {NAV_CONF.map((conf, index) => {
        if (conf.canRender) {
          if (!conf.canRender()) return null;
        }

        return (
          <Fragment key={conf.key}>
            <List disablePadding={true}>
              {conf.label && (
                <ListItem>
                  <Typography variant="h6">{conf.label}</Typography>
                </ListItem>
              )}
              {conf.items &&
                conf.items.map((item, i) => {
                  return (
                    <SideBarItemWithRouter
                      key={item.key}
                      item={item}
                      pathname={router.pathname}
                    />
                  );
                })}
            </List>
            <Divider />
          </Fragment>
        );
      })}
    </div>
  );
};

Nav.propTypes = {
  loadingUser: PropTypes.any,
  me: PropTypes.any,
};

const SideBarItemWithRouter = ({ item, pathname }) => {
  const isCurrentPath = pathname === item.route ? true : false;
  const pathParts = pathname.split('/');
  const containsPath = pathParts.includes(item.key);

  const classes = useSideBarStyles();

  if (!item.canRender()) return null;

  return (
    <ListItem
      classes={{
        root: classes.listItem,
        selected: classes.listItemSelected,
        divider: classes.listItemDivider,
      }}
      selected={containsPath}
      button
      divider
      onClick={() => {
        if (item.action) {
          item.action();
        } else {
          handleLink(item.route);
        }
      }}>
      {/* <ListItemIcon
        style={item.style ? item.style : null}
        className={classes.listItemIcon}>
        {item.icon}
      </ListItemIcon> */}
      <ListItemText
        primary={item.text}
        classes={{
          root: classes.listItemText,
          primary: classes.listItemText,
        }}
      />
    </ListItem>
  );
};

SideBarItemWithRouter.propTypes = {
  item: PropTypes.shape({
    action: PropTypes.func,
    canRender: PropTypes.func,
    key: PropTypes.any,
    route: PropTypes.any,
    text: PropTypes.any,
  }).isRequired,
  pathname: PropTypes.string,
};

export default Nav;
