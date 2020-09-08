import { Fragment, useContext, useEffect } from 'react';
import { store } from '../../store';
import Router from 'next/router';
import { useRouter } from 'next/router';
import clsx from 'clsx';

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
            <List>
              {conf.label && (
                <ListItem>
                  <Typography variant="h6">{conf.label}</Typography>
                </ListItem>
              )}
              {conf.items &&
                conf.items.map((item, i) => {
                  const listItemClass = clsx(
                    classes.listItem,
                    item.route === router.pathname && classes.listItemCurrent
                  );
                  const listItemTextClass = clsx(
                    classes.listItemText
                    // item.route === router.pathname &&
                    //   classes.listItemTextCurrent
                  );
                  if (!item.canRender()) return null;
                  return <SideBarItemWithRouter item={item} />;
                  return (
                    <ListItem
                      // color={item.isCurrentPath ? 'primary' : 'secondary'}
                      className={listItemClass}
                      button
                      key={`${conf.key}${i}`}
                      onClick={() => {
                        if (item.action) {
                          item.action();
                        } else {
                          handleLink(item.route);
                        }
                      }}>
                      <ListItemIcon
                        style={item.style ? item.style : null}
                        className={classes.listItemIcon}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        className={listItemTextClass}
                      />
                    </ListItem>
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

const SideBarItemWithRouter = ({ item }) => {
  const router = useRouter();
  const classes = useSideBarStyles();

  const isCurrentPath = router.pathname === item.route ? true : false;

  const listItemClass = clsx(
    classes.listItem,
    item.route === router.pathname && classes.listItemCurrent
  );
  const listItemTextClass = clsx(
    classes.listItemText
    // item.route === router.pathname &&
    //   classes.listItemTextCurrent
  );

  console.group(`SideBarPath: ${item.route}`);
  console.log('isCurrentPath => ', isCurrentPath);
  console.log('item class => ', listItemClass);
  console.groupEnd();
  return (
    <ListItem
      // color={item.isCurrentPath ? 'primary' : 'secondary'}
      className={listItemClass}
      button
      // key={`${conf.key}${i}`}
      onClick={() => {
        if (item.action) {
          item.action();
        } else {
          handleLink(item.route);
        }
      }}>
      <ListItemIcon
        style={item.style ? item.style : null}
        className={classes.listItemIcon}>
        {item.icon}
      </ListItemIcon>
      <ListItemText primary={item.text} className={listItemTextClass} />
    </ListItem>
  );
};

export default Nav;
