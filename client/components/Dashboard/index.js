import React, { Component } from 'react';
import Router from 'next/router';
import NavButton from '../../styles/NavButton';
import { DashBoardStyles, BoardItemStyles } from './styles';

const handleLink = (route = '/', query = {}) => {
  Router.push({
    pathname: route,
    query: query,
  });
};

// export default class Dashboard extends Component {
//   render() {
//     return (
//       <DashBoardStyles>
//         <h1 className="header">Dashboard</h1>
//         <BoardItemStyles>
//           <NavButton
//             color="secondary"
//             onClick={() => handleLink("/my/applications")}>
//             applications
//           </NavButton>
//         </BoardItemStyles>
//         <BoardItemStyles>
//           <NavButton
//             color="secondary"
//             onClick={() => handleLink("/my/properties")}>
//             Properties
//           </NavButton>
//         </BoardItemStyles>
//         <BoardItemStyles>
//           <NavButton color="secondary" onClick={() => handleLink("/my/leases")}>
//             My Leases
//           </NavButton>
//         </BoardItemStyles>
//         <BoardItemStyles>
//           <NavButton
//             color="secondary"
//             onClick={() => handleLink("/my/friends")}>
//             Friend Manager
//           </NavButton>
//         </BoardItemStyles>
//         <BoardItemStyles>
//           <NavButton
//             color="secondary"
//             onClick={() => handleLink("/add/property")}>
//             Add Housing
//           </NavButton>
//         </BoardItemStyles>
//         <BoardItemStyles>
//           <NavButton color="secondary" onClick={() => handleLink("/account")}>
//             Account
//           </NavButton>
//         </BoardItemStyles>
//       </DashBoardStyles>
//     )
//   }
// }

const DASHBOARD_CONFIG = [
  {
    label: 'applications',
    route: '/my/applications',
    description:
      'Here you can review your applications. You can search and filter by various data to stay up to date with your applications',
    color: 'secondary',
    icon: 'ICON',
  },
  {
    label: 'Properties',
    route: '/my/properties',
    description:
      'As a property owner you can view and manage all of your properties from here',
    color: 'secondary',
    icon: 'ICON',
  },
  {
    label: 'Leases',
    route: '/my/leases',
    description: 'Any leases to sign and manage will be found here',
    color: 'secondary',
    icon: 'ICON',
  },
  {
    label: 'Friend Manager',
    route: '/my/friends',
    description:
      'Here you can search for other users and send or accept friend requests. You can build friend groups or find other users to apply for rentals with',
    color: 'secondary',
    icon: 'ICON',
  },
  {
    label: 'Add Property',
    route: '/add/property',
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
          This is the Hub of re_houser. You can get to anything from here so of
          you get lost just click on the dashboard menu item in the menu bar and
          you will return here
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
