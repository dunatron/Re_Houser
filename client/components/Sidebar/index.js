import { Fragment, useContext } from 'react';
import { store } from '../../store';
import Router from 'next/router';

// material
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  Avatar,
} from '@material-ui/core';

import Skeleton from '@material-ui/lab/Skeleton';

// icons
import PersonIcon from '../../styles/icons/PersonIcon';
import DashboardIcon from '../../styles/icons/DashboardIcon';
import LocationSearchingIcon from '../../styles/icons/LocationSearchingIcon';
import AccountCircleIcon from '../../styles/icons/AccountCircleIcon';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import HouseIcon from '@material-ui/icons/House';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ApartmentIcon from '@material-ui/icons/Apartment';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';

import { useCurrentUser } from '../User';
import { CURRENT_USER_QUERY } from '../User/index';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Typography } from '@material-ui/core';

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
  }).then(() => window.scrollTo(0, 0));
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
const defaultNavItemStyle = {
  minWidth: '32px',
};
const NavigationConfig = (me, loadingUser) => {
  const globalStore = useContext(store);
  const { dispatch, state } = globalStore;
  const [signOut, { data, loading, error }] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const friendRequests = me ? me.friendRequests : [];

  console.log('loadingUser => ', loadingUser);
  console.log('Me in the navigation area => ', me);

  return [
    {
      key: 'admin-section',
      label: 'Admins',
      canRender: () => (me ? me.permissions.includes('ADMIN') : false),
      items: [
        {
          icon: <DashboardIcon />,
          text: 'Admin Dashboard',
          route: '/admin',
          style: { ...defaultNavItemStyle },
          canRender: () => (me ? me.permissions.includes('ADMIN') : false),
        },
      ],
    },
    {
      key: 'general',
      items: [
        {
          icon: <LocationSearchingIcon />,
          text: 'Search Properties',
          route: '/property-search',
          style: { ...defaultNavItemStyle },
          canRender: () => true,
        },
        {
          icon: <HomeWorkIcon />,
          text: 'Free Appraisal',
          route: '/freeappraisal',
          style: { ...defaultNavItemStyle },
          canRender: () => {
            if (me === null) return true;
            return false;
          },
        },
        // {
        //   icon: <DashboardIcon />,
        //   text: 'Dashboard',
        //   route: '/dashboard',
        //   style: { ...defaultNavItemStyle },
        //   canRender: () => {
        //     if (me === null) return false;
        //     return true;
        //   },
        // },
      ],
    },
    // {
    //   key: 'social',
    //   canRender: () => {
    //     if (me === null) return false;
    //     return true;
    //   },
    //   items: [
    //     {
    //       icon: (
    //         <Badge badgeContent={friendRequests.length}>
    //           <PersonIcon />
    //         </Badge>
    //       ),
    //       text: 'Friend Manager',
    //       route: '/social/friends',
    //       style: { ...defaultNavItemStyle },
    //       canRender: () => {
    //         if (me === null) return false;
    //         return true;
    //       },
    //     },
    //     {
    //       icon: (
    //         <Badge badgeContent={friendRequests.length}>
    //           <PersonIcon />
    //         </Badge>
    //       ),
    //       text: 'Messages',
    //       route: '/social/chats',
    //       style: { ...defaultNavItemStyle },
    //       canRender: () => {
    //         if (me === null) return false;
    //         return true;
    //       },
    //     },
    //   ],
    // },

    {
      key: 'landlord',
      // label: 'Landlords',
      canRender: () => {
        // if (me === null) return false;
        return true;
      },
      items: [
        {
          icon: <HouseIcon />,
          text: 'Landlord Portal',
          route: '/landlord',
          style: { ...defaultNavItemStyle },
          canRender: () => true, // set to try just to run it alot on the same account in dev
        },
        // {
        //   icon: <HomeWorkIcon />,
        //   text: 'Free Appraisal',
        //   route: '/freeappraisal',
        //   style: { ...defaultNavItemStyle },
        //   canRender: () => true, // set to try just to run it alot on the same account in dev
        // },
        // {
        //   icon: <AssignmentIcon />,
        //   text: 'Applications',
        //   route: '/applications',
        //   style: { ...defaultNavItemStyle },
        //   canRender: () => {
        //     if (me === null) return false;
        //     return true;
        //   },
        // },
        // {
        //   icon: <ApartmentIcon />,
        //   text: 'Leases',
        //   route: '/leases',
        //   style: { ...defaultNavItemStyle },
        //   canRender: () => {
        //     if (me === null) return false;
        //     return true;
        //   },
        // },
        // {
        //   icon: <HouseIcon />,
        //   text: 'Properties',
        //   route: '/properties',
        //   style: { ...defaultNavItemStyle },
        //   canRender: () => {
        //     if (me === null) return false;
        //     return true;
        //   },
        // },
      ],
    },
    {
      key: 'tenant',
      // label: 'Tenant',
      canRender: () => {
        // if (me === null) return false;
        return true;
      },
      items: [
        {
          icon: <AssignmentIcon />,
          text: 'Tenant Portal',
          route: '/tenant',
          style: { ...defaultNavItemStyle },
          canRender: () => true,
        },
        // {
        //   icon: <AssignmentIcon />,
        //   text: 'Applications',
        //   route: '/applications',
        //   style: { ...defaultNavItemStyle },
        //   canRender: () => true,
        // },
        // {
        //   icon: <ApartmentIcon />,
        //   text: 'Leases',
        //   route: '/leases',
        //   style: { ...defaultNavItemStyle },
        //   canRender: () => true,
        // },
      ],
    },
    {
      key: 'account',
      items: [
        // {
        //   icon: ProfileIcon(me),
        //   text: 'Social',
        //   route: '/social',
        //   // style: { ...defaultNavItemStyle, minWidth: '56px' }, // so actual MD defaults
        //   canRender: () => {
        //     if (me === null) return false;
        //     return true;
        //   },
        // },
        // {
        //   icon: ProfileIcon(me),
        //   text: 'Account',
        //   route: '/account',
        //   // style: { ...defaultNavItemStyle, minWidth: '56px' }, // so actual MD defaults
        //   canRender: () => {
        //     if (me === null) return false;
        //     return true;
        //   },
        // },
        // {
        //   icon: <DonutSmallIcon />,
        //   text: 'Activity',
        //   route: '/activity',
        //   style: { ...defaultNavItemStyle },
        //   canRender: () => {
        //     if (me === null) return false;
        //     return true;
        //   },
        // },
        // {
        //   icon: <InfoIcon />,
        //   text: 'Info',
        //   route: '/info',
        //   style: { ...defaultNavItemStyle },
        //   canRender: () => true, // set to try just to run it alot on the same account in dev
        // },
        {
          icon: <InfoIcon />,
          text: 'About Us',
          route: '/about-us',
          style: { ...defaultNavItemStyle },
          canRender: () => true, // set to try just to run it alot on the same account in dev
        },
        {
          icon: <ContactPhoneIcon />,
          text: 'Contact',
          route: '/contact',
          style: { ...defaultNavItemStyle },
          canRender: () => true, // set to try just to run it alot on the same account in dev
        },
        // {
        //   icon: loadingUser ? (
        //     <Skeleton variant="circle" width={40} height={40} />
        //   ) : (
        //     <AccountCircleIcon />
        //   ),
        //   text: 'Login',
        //   route: '/login',
        //   style: { ...defaultNavItemStyle },
        //   canRender: () => {
        //     if (me !== null) return false;
        //     return true;
        //   },
        // },
        // {
        //   icon: <AccountCircleIcon />,
        //   text: 'Logout',
        //   route: '/logout',
        //   style: { ...defaultNavItemStyle },
        //   canRender: () => {
        //     if (me === null) return false;
        //     return true;
        //   },
        //   action: () => signOut(),
        // },
      ],
    },
  ];
};

const Nav = ({ loadingUser, me }) => {
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
              {conf.label && (
                <ListItem>
                  <Typography variant="h6">{conf.label}</Typography>
                </ListItem>
              )}
              {conf.items &&
                conf.items.map((item, i) => {
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
                      <ListItemIcon style={item.style ? item.style : null}>
                        {item.icon}
                      </ListItemIcon>
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
