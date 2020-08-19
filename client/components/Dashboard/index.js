// import React, { Component } from 'react';
// import Router from 'next/router';
// import NavButton from '../../styles/NavButton';
// import { DashBoardStyles, BoardItemStyles } from './styles';
// import { SITE_NAME } from '../../lib/const';

// const handleLink = (route = '/', query = {}) => {
//   Router.push({
//     pathname: route,
//     query: query,
//   });
// };

// const Dashboard = ({ config }) => {
//   return (
//     <DashBoardStyles elevation={4}>
//       <h1 className="heading">Dashboard</h1>
//       <p className="intro">
//         This is the Hub of {SITE_NAME}. You can get to anything from here so of
//         you get lost just click on the dashboard menu item in the menu bar and
//         you will return here
//       </p>
//       <div className="items">
//         {config.map((dashboardItem, i) => (
//           <BoardItemStyles key={i} elevation={8}>
//             <NavButton
//               className="item-btn"
//               color={dashboardItem.color}
//               onClick={() => handleLink(dashboardItem.route)}>
//               {dashboardItem.label}
//             </NavButton>
//             <div className="item-description">{dashboardItem.description}</div>
//           </BoardItemStyles>
//         ))}
//       </div>
//     </DashBoardStyles>
//   );
// };

// export default Dashboard;

// // export default class Dashboard extends Component {
// //   render() {
// //     return (
// //       <DashBoardStyles elevation={4}>
// //         <h1 className="heading">Dashboard</h1>
// //         <p className="intro">
// //           This is the Hub of {SITE_NAME}. You can get to anything from here so
// //           of you get lost just click on the dashboard menu item in the menu bar
// //           and you will return here
// //         </p>
// //         <div className="items">
// //           {DASHBOARD_CONFIG.map((dashboardItem, i) => (
// //             <BoardItemStyles key={i} elevation={8}>
// //               <NavButton
// //                 className="item-btn"
// //                 color={dashboardItem.color}
// //                 onClick={() => handleLink(dashboardItem.route)}>
// //                 {dashboardItem.label}
// //               </NavButton>
// //               <div className="item-description">
// //                 {dashboardItem.description}
// //               </div>
// //             </BoardItemStyles>
// //           ))}
// //         </div>
// //       </DashBoardStyles>
// //     );
// //   }
// // }

import React, { Component } from 'react';
import Router from 'next/router';
import NavButton from '../../styles/NavButton';
import { DashBoardStyles, BoardItemStyles } from './styles';
import { SITE_NAME } from '../../lib/const';
import { Typography } from '@material-ui/core';

const handleLink = (route = '/', query = {}) => {
  Router.push({
    pathname: route,
    query: query,
  });
};

const Dashboard = ({ heading, intro, config, elevation, me }) => {
  return (
    <DashBoardStyles elevation={elevation}>
      {/* {heading && <h1 className="heading">{heading}</h1>}
      {intro && <p className="intro">{intro}</p>} */}
      {heading && (
        <Typography className="heading" variant="h3">
          {heading}
        </Typography>
      )}
      {intro && (
        <Typography className="intro" variant="body1">
          {intro}
        </Typography>
      )}

      <div className="items">
        {config.map((dashboardItem, i) => (
          <BoardItemStyles key={i} elevation={8}>
            <NavButton
              className="item-btn"
              color={dashboardItem.color}
              disabled={dashboardItem.requiresLogin ? true : false}
              onClick={() => handleLink(dashboardItem.route)}>
              {dashboardItem.icon && (
                <div className="item-btn-ico">{dashboardItem.icon}</div>
              )}
              {dashboardItem.label}
            </NavButton>
            {dashboardItem.requiresLogin && !me && (
              <Typography
                gutterBottom
                style={{
                  textAlign: 'center',
                }}>
                (requires login)
              </Typography>
            )}
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
