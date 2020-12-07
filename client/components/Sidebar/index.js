import PropTypes from 'prop-types';
import { Fragment, useContext, useEffect } from 'react';
import { store } from '@/Store/index';
import Router from 'next/router';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';

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

const handleLink = (route = '/', query = {}) => {
  Router.push({
    pathname: route,
    query: query,
  });
};

const Nav = props => {
  const router = useRouter();
  const { loadingUser, me } = props;
  const NAV_CONF = navConfig(me, loadingUser, router.pathname);
  const classes = useSideBarStyles();

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
    <Link href={item.route} passHref>
      <ListItem
        classes={{
          root: classes.listItem,
          selected: classes.listItemSelected,
          divider: classes.listItemDivider,
        }}
        selected={containsPath}
        button
        component="a"
        divider
        onClick={e => {
          if (item.action) {
            item.action();
          }
        }}>
        <ListItemText
          primary={item.text}
          classes={{
            root: classes.listItemText,
            primary: classes.listItemText,
          }}
        />
      </ListItem>
    </Link>
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
