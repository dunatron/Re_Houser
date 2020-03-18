import React, { Component } from 'react';
import Router from 'next/router';
import NavButton from '../../styles/NavButton';
import { DashBoardStyles, BoardItemStyles } from './styles';
import { SITE_NAME } from '../../lib/const';

const handleLink = (route = '/', query = {}) => {
  Router.push({
    pathname: route,
    query: query,
  });
};

const DASHBOARD_CONFIG = [
  {
    label: 'activity',
    route: '/activity',
    description: 'Review your latest activity',
    color: 'secondary',
    icon: 'ICON',
  },
  {
    label: 'applications',
    route: '/applications',
    description:
      'Here you can review your applications. You can search and filter by various data to stay up to date with your applications',
    color: 'secondary',
    icon: 'ICON',
  },
  {
    label: 'Properties',
    route: '/properties',
    description:
      'As a property owner you can view and manage all of your properties from here',
    color: 'secondary',
    icon: 'ICON',
  },
  {
    label: 'Leases',
    route: '/leases',
    description: 'Any leases to sign and manage will be found here',
    color: 'secondary',
    icon: 'ICON',
  },
  {
    label: 'Friend Manager',
    route: '/social/friends',
    description:
      'Here you can search for other users and send or accept friend requests. You can build friend groups or find other users to apply for rentals with',
    color: 'secondary',
    icon: 'ICON',
  },
  {
    label: 'Add Property',
    route: '/properties/add',
    description:
      'Add Properties for renting. This is where we collect information about your rental before adding it to your profile',
    color: 'secondary',
    icon: 'ICON',
  },
  {
    label: 'Account',
    route: '/account',
    description:
      'Manage your Re_Houser account. filling out these details early will make using the rest of the app painless',
    color: 'secondary',
    icon: 'ICON',
  },
];

export default class Dashboard extends Component {
  render() {
    return (
      <DashBoardStyles elevation={4}>
        <h1 className="heading">Dashboard</h1>
        <p className="intro">
          This is the Hub of {SITE_NAME}. You can get to anything from here so
          of you get lost just click on the dashboard menu item in the menu bar
          and you will return here
        </p>
        <div className="items">
          {DASHBOARD_CONFIG.map((dashboardItem, i) => (
            <BoardItemStyles key={i} elevation={8}>
              <NavButton
                className="item-btn"
                color={dashboardItem.color}
                onClick={() => handleLink(dashboardItem.route)}>
                {dashboardItem.label}
              </NavButton>
              <div className="item-description">
                {dashboardItem.description}
              </div>
            </BoardItemStyles>
          ))}
        </div>
      </DashBoardStyles>
    );
  }
}
