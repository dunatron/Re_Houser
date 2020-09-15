import PropTypes from 'prop-types';
import Router from 'next/router';
import NavButton from '@/Styles/NavButton';
import { DashBoardStyles, BoardItemStyles } from './styles';
import { Typography } from '@material-ui/core';
import { Reveal, Tween } from 'react-gsap';

const handleLink = (route = '/', query = {}) => {
  Router.push({
    pathname: route,
    query: query,
  });
};

const Dashboard = ({ heading, intro, config, elevation, me }) => {
  return (
    <DashBoardStyles elevation={elevation}>
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
          <Reveal key={i} repeat>
            <Tween from={{ opacity: 0 }} duration={2}>
              <BoardItemStyles key={i} elevation={8}>
                <NavButton
                  className="item-btn"
                  color={dashboardItem.color}
                  disabled={dashboardItem.requiresLogin && !me ? true : false}
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
                <div className="item-description">
                  {dashboardItem.description}
                </div>
              </BoardItemStyles>
            </Tween>
          </Reveal>
        ))}
      </div>
    </DashBoardStyles>
  );
};

Dashboard.propTypes = {
  config: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  elevation: PropTypes.any.isRequired,
  heading: PropTypes.any.isRequired,
  intro: PropTypes.any.isRequired,
  me: PropTypes.any.isRequired,
};

export default Dashboard;
