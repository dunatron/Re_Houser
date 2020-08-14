import TEAM_CONFIG from '../../lib/configs/teamConfig';
import TeamMember from '../../components/Team/TeamMember';

const TeamMemberPage = props => {
  const {
    appData: { currentUser },
    query,
  } = props;

  // get the name from query param. use it to find trhe subUrl and pass that member in
  const nameParamLowercase = query.name.toLowerCase();

  const member = TEAM_CONFIG.find(item => item.subUrl === nameParamLowercase);

  if (!member) return `No team member for ${query.name}`;

  // PageHeder on TeamMember component

  return <TeamMember member={member} />;
};

export default TeamMemberPage;
