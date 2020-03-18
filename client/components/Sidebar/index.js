import Router from 'next/router';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '../../styles/icons/PersonIcon';
import DashboardIcon from '../../styles/icons/DashboardIcon';
import LocationSearchingIcon from '../../styles/icons/LocationSearchingIcon';
import AccountCircleIcon from '../../styles/icons/AccountCircleIcon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Skeleton from '@material-ui/lab/Skeleton';
import { Fragment } from 'react';

import { useCurrentUser } from '../User';
import { CURRENT_USER_QUERY } from '../User/index';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const handleLink = (route = '/', query = {}) => {
  Router.push({
    pathname: route,
    query: query,
  });
};

const ProfileIcon = me => {
  if (me) {
    if (me.profilePhoto) {
      return (
        <Avatar
          alt={me.profilePhoto.filename}
          src={me.profilePhoto.url}
          // className={classes.avatar}
        />
      );
    }
    // so lazy today huh
    return <AccountCircleIcon />;
  }

  return <AccountCircleIcon />;
};

const NavigationConfig = (me, loadingUser) => {
  const [signOut, { data, loading, error }] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const friendRequests = me ? me.friendRequests : [];
  return [
    {
      key: 'general',
      items: [
        {
          icon: <LocationSearchingIcon />,
          text: 'Look',
          route: '/look',
          canRender: () => true,
        },
        {
          icon: <DashboardIcon />,
          text: 'Dashboard',
          route: '/dashboard',
          canRender: () => true,
        },
        {
          icon: <DashboardIcon />,
          text: 'Activity',
          route: '/activity',
          canRender: () => true,
        },
        {
          icon: ProfileIcon(me),
          text: 'Account',
          route: '/account',
          canRender: () => true,
        },
      ],
    },
    {
      key: 'social',
      canRender: () => {
        if (me === null) return false;
        return true;
      },
      items: [
        {
          icon: (
            <Badge badgeContent={friendRequests.length}>
              <PersonIcon />
            </Badge>
          ),
          text: 'Friend Manager',
          route: '/social/friends',
          canRender: () => {
            if (me === null) return false;
            return true;
          },
        },
        {
          icon: (
            <Badge badgeContent={friendRequests.length}>
              <PersonIcon />
            </Badge>
          ),
          text: 'Messages',
          route: '/social/chats',
          canRender: () => {
            if (me === null) return false;
            return true;
          },
        },
      ],
    },
    {
      key: 'landlord',
      canRender: () => {
        if (me === null) return false;
        return true;
      },
      items: [
        {
          icon: <DashboardIcon />,
          text: 'Add Property',
          route: '/properties/add',
          canRender: () => true,
        },
        {
          icon: <DashboardIcon />,
          text: 'Applications',
          route: '/applications',
          canRender: () => true,
        },
        {
          icon: <DashboardIcon />,
          text: 'Leases',
          route: '/leases',
          canRender: () => true,
        },
        {
          icon: <DashboardIcon />,
          text: 'Properties',
          route: '/properties',
          canRender: () => true,
        },
      ],
    },
    {
      key: 'account',
      items: [
        {
          icon: loadingUser ? (
            <Skeleton variant="circle" width={40} height={40} />
          ) : (
            <AccountCircleIcon />
          ),
          text: 'Login',
          route: '/login',
          canRender: () => {
            if (me !== null) return false;
            return true;
          },
        },
        {
          icon: <AccountCircleIcon />,
          text: 'Logout',
          route: '/logout',
          canRender: () => {
            if (me === null) return false;
            return true;
          },
          action: () => signOut(),
        },
      ],
    },
  ];
};

const Nav = ({ loadingUser }) => {
  const user = useCurrentUser();
  const { data, loading, error } = user;
  const me = data ? data.me : null;
  const NAV_CONF = NavigationConfig(me, loadingUser);
  return (
    <div>
      {NAV_CONF.map((conf, index) => {
        if (conf.canRender) {
          if (!conf.canRender()) return null;
        }
        return (
          <Fragment key={conf.key}>
            <List>
              {conf.items.map((item, i) => {
                if (!item.canRender()) return null;
                return (
                  <ListItem
                    button
                    key={`${conf.key}${i}`}
                    onClick={() => {
                      if (item.action) {
                        item.action();
                      } else {
                        handleLink(item.route);
                      }
                    }}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
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

export default Nav;
