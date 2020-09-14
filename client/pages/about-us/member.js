import PropTypes from 'prop-types';

import TEAM_CONFIG from '@/Lib/configs/teamConfig';
import TeamMember from '@/Components/Team/TeamMember';

const TeamMemberPage = ({ query: { name } }) => {
  // get the name from query param. use it to find trhe subUrl and pass that member in
  const nameParamLowercase = name.toLowerCase();

  const member = TEAM_CONFIG.find(item => item.subUrl === nameParamLowercase);

  if (!member) return `No team member for ${name}`;

  return <TeamMember member={member} />;
};

TeamMemberPage.propTypes = {
  query: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default TeamMemberPage;
