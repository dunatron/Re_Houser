import PropTypes from 'prop-types';
import { Fragment, useContext, useEffect } from 'react';
import { store } from '@/Store/index';

// icons
import PersonIcon from '@/Styles/icons/PersonIcon';
import DashboardIcon from '@/Styles/icons/DashboardIcon';
import LocationSearchingIcon from '@/Styles/icons/LocationSearchingIcon';
import AccountCircleIcon from '@/Styles/icons/AccountCircleIcon';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import HouseIcon from '@material-ui/icons/House';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ApartmentIcon from '@material-ui/icons/Apartment';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';

import { useCurrentUser } from '@/Components/User';
import { CURRENT_USER_QUERY } from '@/Components/User/index';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;
const defaultNavItemStyle = {
  minWidth: '32px',
};
const NavigationConfig = (me, loadingUser, pathname) => {
  const globalStore = useContext(store);
  const { dispatch, state } = globalStore;
  const [signOut, { data, loading, error }] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const friendRequests = me ? me.friendRequests : [];

  // router stuff

  return [
    {
      key: 'admin-section',
      // label: 'Admins',
      canRender: () => (me ? me.permissions.includes('ADMIN') : false),
      items: [
        {
          key: 'admin',
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
          key: 'property-search',
          icon: <LocationSearchingIcon />,
          text: 'Search',
          route: '/property-search',
          style: { ...defaultNavItemStyle },
          canRender: () => true,
        },
        {
          key: 'freeappraisal',
          icon: <HomeWorkIcon />,
          text: 'Free Appraisal',
          route: '/freeappraisal',
          style: { ...defaultNavItemStyle },
          canRender: () => {
            if (me === null) return true;
            return false;
          },
        },
        {
          key: 'landlord',
          icon: <HouseIcon />,
          text: 'Landlord',
          route: '/landlord',
          isCurrentPath: true,
          style: { ...defaultNavItemStyle },
          canRender: () => true, // set to try just to run it alot on the same account in dev
        },
        {
          key: 'tenant',
          icon: <AssignmentIcon />,
          text: 'Tenant',
          route: '/tenant',
          style: { ...defaultNavItemStyle },
          canRender: () => true,
        },
        {
          key: 'about-us',
          icon: <InfoIcon />,
          text: 'About Us',
          route: '/about-us',
          style: { ...defaultNavItemStyle },
          canRender: () => true, // set to try just to run it alot on the same account in dev
        },
        {
          key: 'contact',
          icon: <ContactPhoneIcon />,
          text: 'Contact',
          route: '/contact',
          style: { ...defaultNavItemStyle },
          canRender: () => true, // set to try just to run it alot on the same account in dev
        },
      ],
    },
    // {
    //   key: 'landlord',
    //   // label: 'Landlords',

    //   canRender: () => {
    //     // if (me === null) return false;
    //     return true;
    //   },
    //   items: [
    //     {
    //       icon: <HouseIcon />,
    //       text: 'Landlord Portal',
    //       route: '/landlord',
    //       isCurrentPath: true,
    //       style: { ...defaultNavItemStyle },
    //       canRender: () => true, // set to try just to run it alot on the same account in dev
    //     },
    //   ],
    // },
    // {
    //   key: 'tenant',
    //   // label: 'Tenant',
    //   canRender: () => {
    //     // if (me === null) return false;
    //     return true;
    //   },
    //   items: [
    //     {
    //       icon: <AssignmentIcon />,
    //       text: 'Tenant Portal',
    //       route: '/tenant',
    //       style: { ...defaultNavItemStyle },
    //       canRender: () => true,
    //     },
    //   ],
    // },
    // {
    //   key: 'account',
    //   items: [
    //     {
    //       icon: <InfoIcon />,
    //       text: 'About Us',
    //       route: '/about-us',
    //       style: { ...defaultNavItemStyle },
    //       canRender: () => true, // set to try just to run it alot on the same account in dev
    //     },
    //     {
    //       icon: <ContactPhoneIcon />,
    //       text: 'Contact',
    //       route: '/contact',
    //       style: { ...defaultNavItemStyle },
    //       canRender: () => true, // set to try just to run it alot on the same account in dev
    //     },
    //   ],
    // },
  ];
};

NavigationConfig.propTypes = {
  friendRequests: PropTypes.any.isRequired,
  permissions: PropTypes.shape({
    includes: PropTypes.func,
  }).isRequired,
};

export default NavigationConfig;
