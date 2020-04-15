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

const Dashboard = ({ config }) => {
  return (
    <DashBoardStyles elevation={4}>
      <h1 className="heading">Dashboard</h1>
      <p className="intro">
        This is the Hub of {SITE_NAME}. You can get to anything from here so of
        you get lost just click on the dashboard menu item in the menu bar and
        you will return here
      </p>
      <div className="items">
        {config.map((dashboardItem, i) => (
          <BoardItemStyles key={i} elevation={8}>
            <NavButton
              className="item-btn"
              color={dashboardItem.color}
              onClick={() => handleLink(dashboardItem.route)}>
              {dashboardItem.label}
            </NavButton>
            <div className="item-description">{dashboardItem.description}</div>
          </BoardItemStyles>
        ))}
      </div>
    </DashBoardStyles>
  );
};

export default Dashboard;

// export default class Dashboard extends Component {
//   render() {
//     return (
//       <DashBoardStyles elevation={4}>
//         <h1 className="heading">Dashboard</h1>
//         <p className="intro">
//           This is the Hub of {SITE_NAME}. You can get to anything from here so
//           of you get lost just click on the dashboard menu item in the menu bar
//           and you will return here
//         </p>
//         <div className="items">
//           {DASHBOARD_CONFIG.map((dashboardItem, i) => (
//             <BoardItemStyles key={i} elevation={8}>
//               <NavButton
//                 className="item-btn"
//                 color={dashboardItem.color}
//                 onClick={() => handleLink(dashboardItem.route)}>
//                 {dashboardItem.label}
//               </NavButton>
//               <div className="item-description">
//                 {dashboardItem.description}
//               </div>
//             </BoardItemStyles>
//           ))}
//         </div>
//       </DashBoardStyles>
//     );
//   }
// }
